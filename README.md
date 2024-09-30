# Contact Manager

Este proyecto es un administrador de contactos que permite realizar las operaciones básicas de un CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos. La aplicación está desarrollada utilizando Flask para el backend, MySQL como base de datos y un frontend construido con HTML, CSS (usando Bootstrap) y JavaScript. Docker se utiliza para la contenedorización de la aplicación, facilitando el despliegue y la ejecución en cualquier entorno.

## Características

- **Crear Contactos**: Puedo agregar nuevos contactos con nombre, teléfono y correo electrónico.
- **Leer Contactos**: La lista de contactos almacenados se puede visualizar en tiempo real.
- **Actualizar Contactos**: Es posible modificar los detalles de un contacto existente.
- **Eliminar Contactos**: Los contactos pueden ser eliminados de la lista de forma sencilla.
- **Interfaz de Usuario Personalizada**: He diseñado un popup personalizado para la edición de contactos que mejora la experiencia de usuario.

## Tecnologías Utilizadas

- **Frontend**:
  - HTML5
  - CSS3 (Bootstrap para el diseño responsivo)
  - JavaScript (DOM manipulation)
  - FontAwesome para los íconos

- **Backend**:
  - Flask (micro-framework de Python)
  - Flask-CORS para manejar las políticas CORS
  - Flask-SQLAlchemy para la interacción con la base de datos

- **Base de Datos**:
  - MySQL 5.7 (gestión de contactos)

- **Contenedorización**:
  - Docker y Docker Compose (para manejar múltiples servicios, incluidos el frontend, backend y la base de datos)

## Requisitos Previos

- Tener instalado Docker y Docker Compose en el sistema.

## Instrucciones de Instalación

### 1. Clonar el Repositorio
Primero, clona el repositorio en tu máquina local:
```bash
git clone <url-del-repositorio>
cd contacts-app
```

### 2. Construir y Levantar los Contenedores
Para levantar la aplicación completa, navega a la carpeta raíz del proyecto y ejecuta el siguiente comando:
```bash
docker-compose up --build
```

Este comando levantará tres servicios:
- **frontend** en el puerto `80`
- **backend** en el puerto `5001`
- **MySQL database** en el puerto `3306`

### 3. Acceder a la Aplicación
Abre tu navegador web y accede a:
```
http://localhost
```
Aquí podrás visualizar la interfaz del administrador de contactos.

## Funcionalidades CRUD

### Crear un Contacto
En la parte superior del formulario, puedo ingresar un nombre, un número de teléfono y un correo electrónico, luego hacer clic en el botón "Add Contact". Este contacto será guardado en la base de datos y aparecerá en la lista de contactos.

### Leer los Contactos
La lista de contactos se muestra automáticamente cuando se carga la página. La lista es consultada directamente desde el backend a través de una petición `GET` al endpoint `/contacts`.

### Actualizar un Contacto
Cada contacto en la lista tiene un ícono de lápiz. Al hacer clic en este ícono, se abre un modal que permite editar los datos del contacto seleccionado. Una vez modificados, los cambios se guardan en la base de datos y se actualiza la lista de contactos.

### Eliminar un Contacto
Cada contacto también tiene un ícono de basurero que, al hacer clic en él, elimina el contacto de la base de datos y lo remueve de la lista.

## Estructura del Proyecto

- **frontend/**: Contiene los archivos HTML, CSS y JavaScript.
- **backend/**: Contiene el código de la aplicación Flask.
  - `app.py`: Define las rutas para el CRUD y la lógica del backend.
  - `requirements.txt`: Lista de dependencias de Python necesarias para ejecutar el backend.
- **docker-compose.yml**: Configura los servicios Docker para la base de datos, el backend y el frontend.
- **Dockerfile**: Instrucciones para construir la imagen Docker del backend.

## Personalización del Proyecto

Este proyecto está diseñado de manera modular, permitiéndome personalizar fácilmente tanto el frontend como el backend según las necesidades de cualquier otro proyecto o cliente. Además, la contenedorización con Docker hace que el despliegue sea rápido y consistente.

