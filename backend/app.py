from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:example@db/example_db'
db = SQLAlchemy(app)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=True)

db.create_all()

@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([{'id': contact.id, 'name': contact.name, 'phone': contact.phone, 'email': contact.email} for contact in contacts])

@app.route('/contacts', methods=['POST'])
def add_contact():
    data = request.json
    new_contact = Contact(name=data['name'], phone=data['phone'], email=data.get('email', ''))
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({'message': 'Contact added successfully'}), 201

@app.route('/contacts/<int:id>', methods=['PUT'])
def update_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404
    data = request.json
    contact.name = data['name']
    contact.phone = data['phone']
    contact.email = data.get('email', contact.email)
    db.session.commit()
    return jsonify({'message': 'Contact updated successfully'})

@app.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({'message': 'Contact not found'}), 404
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message': 'Contact deleted successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


