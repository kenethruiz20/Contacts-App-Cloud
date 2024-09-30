from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:example@db/example_db'
db = SQLAlchemy(app)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)

db.create_all()

@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([{'id': contact.id, 'name': contact.name, 'phone': contact.phone, 'email': contact.email} for contact in contacts])

@app.route('/contacts', methods=['POST'])
def add_contact():
    data = request.json

    # Validación de formato de correo electrónico
    email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_pattern, data['email']):
        return jsonify({'message': 'Correo electrónico no válido'}), 400

    # Validación de que el número no tenga letras
    if not data['phone'].isdigit():
        return jsonify({'message': 'El número de teléfono solo debe contener dígitos'}), 400

    # Comprobar si ya existe un contacto con el mismo teléfono o correo electrónico
    existing_contact = Contact.query.filter((Contact.phone == data['phone']) | (Contact.email == data['email'])).first()
    if existing_contact:
        return jsonify({'message': 'El contacto ya existe'}), 400

    new_contact = Contact(name=data['name'], phone=data['phone'], email=data['email'])
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({'message': 'Contacto añadido exitosamente'}), 201

@app.route('/contacts/<int:id>', methods=['PUT'])
def update_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({'message': 'Contacto no encontrado'}), 404
    data = request.json

    # Validación de formato de correo electrónico
    email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_pattern, data['email']):
        return jsonify({'message': 'Correo electrónico no válido'}), 400

    # Validación de que el número no tenga letras
    if not data['phone'].isdigit():
        return jsonify({'message': 'El número de teléfono solo debe contener dígitos'}), 400

    # Comprobar si ya existe un contacto con el mismo teléfono o correo electrónico
    existing_contact = Contact.query.filter((Contact.id != id) & ((Contact.phone == data['phone']) | (Contact.email == data['email']))).first()
    if existing_contact:
        return jsonify({'message': 'Ya existe otro contacto con ese número o correo electrónico'}), 400

    contact.name = data['name']
    contact.phone = data['phone']
    contact.email = data['email']
    db.session.commit()
    return jsonify({'message': 'Contacto actualizado exitosamente'})

@app.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({'message': 'Contacto no encontrado'}), 404
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message': 'Contacto eliminado exitosamente'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)