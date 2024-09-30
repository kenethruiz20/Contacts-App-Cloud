A continuación te proporciono un **README.md** completo y detallado para tu proyecto de gestión de contactos utilizando Flask, MySQL, Docker, y Bootstrap:

---

# Contact Manager Application

## Description

The **Contact Manager Application** is a simple web-based CRUD application where users can create, read, update, and delete contacts. This project is built using Flask for the backend, MySQL as the database, Bootstrap for frontend styling, and Docker to containerize the entire application for easy setup and deployment.

## Features

- **Create**: Add new contacts with name, phone number, and email.
- **Read**: View a list of all contacts.
- **Update**: Edit contact details (name, phone number, email).
- **Delete**: Remove contacts from the list.
- **Responsive UI**: The frontend is styled using Bootstrap to ensure a modern and responsive design.
  
## Technologies Used

- **Backend**: Flask (Python) with Flask-SQLAlchemy ORM
- **Frontend**: HTML, CSS, Bootstrap, JavaScript
- **Database**: MySQL
- **Containerization**: Docker & Docker Compose
- **Icons**: FontAwesome for Edit/Delete icons

## Project Structure

```plaintext
.
├── backend
│   ├── app.py                  # Main backend Flask app
│   ├── Dockerfile              # Dockerfile for backend
│   ├── requirements.txt        # Python dependencies
├── frontend
│   ├── index.html              # Main HTML page
│   ├── styles.css              # Styling (Bootstrap integrated)
│   ├── app.js                  # Frontend JavaScript (CRUD operations)
│   ├── Dockerfile              # Dockerfile for frontend
├── docker-compose.yml          # Docker Compose configuration
└── README.md                   # This file
```

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Docker**: [Installation Guide](https://docs.docker.com/get-docker/)
- **Docker Compose**: Comes installed with Docker Desktop.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/contact-manager-app.git
cd contact-manager-app
```

### 2. Set Up Environment

Ensure Docker is installed and running on your machine.

### 3. Start the Application

Use Docker Compose to build and start the application. Run the following command in the root of the project directory:

```bash
docker-compose up --build
```

This will:

- Build the Docker images for both the frontend and backend services.
- Start up the MySQL database, backend, and frontend services.

### 4. Access the Application

Once the services are running, you can access the application in your web browser:

- **Frontend**: Open your browser and navigate to `http://localhost`.
- **Backend API**: The backend API is available at `http://localhost:5001/contacts`.

## Usage

### 1. Adding a Contact
- Enter the name, phone number, and email of the contact in the form and click the "Add Contact" button.
- The contact will be added to the list and saved in the database.

### 2. Editing a Contact
- Click the pencil icon next to the contact you want to edit.
- A custom popup will appear where you can edit the contact's information.
- Click "Save" to update the contact in the list and database.

### 3. Deleting a Contact
- Click the trash can icon next to the contact you want to delete.
- The contact will be removed from the list and deleted from the database.

## API Endpoints

- **GET /contacts**: Returns a list of all contacts in the database.
- **POST /contacts**: Adds a new contact to the database. The request body should include `name`, `phone`, and `email`.
- **PUT /contacts/{id}**: Updates an existing contact. The request body should include the updated `name`, `phone`, and/or `email`.
- **DELETE /contacts/{id}**: Deletes a contact by its ID.

## Docker Services

This project uses **Docker Compose** to orchestrate three services:

1. **db**: A MySQL 5.7 database service.
2. **backend**: The Flask application container.
3. **frontend**: The Nginx server serving the frontend HTML/CSS/JS.

### Stopping the Services

To stop the running containers, run:

```bash
docker-compose down
```

### Restarting Services

To rebuild and restart the services (for example, after code changes), run:

```bash
docker-compose up --build
```

## Customizing the Project

### Changing the Database Configuration

You can change the MySQL credentials or the database name by editing the `docker-compose.yml` file:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: example
  MYSQL_DATABASE: example_db
```

Ensure that any changes here are reflected in the Flask app's database connection string in `app.py`:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:example@db/example_db'
```

### Adding More Features

You can extend this application by adding new features such as:

- Search functionality.
- Contact grouping by categories.
- Exporting contacts to CSV or other formats.

## Known Issues

- **Docker Memory Usage**: If running on a machine with limited resources, Docker may consume significant memory. Ensure you have adequate resources allocated to Docker in your settings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- **Flask**: Microframework used for the backend.
- **Bootstrap**: Framework for responsive frontend design.
- **FontAwesome**: Icons for the edit and delete buttons.
- **Docker**: Containerization technology for easy deployment and development.

---

This **README** covers all the essential aspects of your project: from setup and configuration to usage and customization. Feel free to expand it as the project grows!
