const API_URL = 'http://localhost:5001/contacts';

let contacts = [];

async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        contacts = await response.json();
        displayContacts(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
}

function displayContacts(contactsToDisplay) {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    contactsToDisplay.forEach(contact => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            <span>${contact.name} - ${contact.phone} (${contact.email})</span>
            <div class="actions">
                <button class="btn btn-sm btn-outline-secondary" onclick="openEditModal(${contact.id}, '${contact.name}', '${contact.phone}', '${contact.email}')">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger ms-2" onclick="openDeleteModal(${contact.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        contactList.appendChild(li);
    });
}

async function addContact() {
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const email = document.getElementById('contact-email').value;

    // Validación de campos
    if (!name || !phone || !validatePhone(phone) || !validateEmail(email)) {
        alert('Por favor, ingresa un nombre, número de teléfono válido y un email válido.');
        return;
    }

    // Verificar duplicados
    if (contacts.some(contact => contact.phone === phone || contact.email === email)) {
        alert('Este contacto ya existe con ese número o correo electrónico.');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, email }),
        });

        if (!response.ok) {
            throw new Error('No se pudo añadir el contacto.');
        }

        // Limpiar campos
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-phone').value = '';
        document.getElementById('contact-email').value = '';

        fetchContacts();
    } catch (error) {
        console.error('Error adding contact:', error);
    }
}

function openEditModal(id, name, phone, email) {
    document.getElementById('edit-contact-id').value = id;
    document.getElementById('edit-contact-name').value = name;
    document.getElementById('edit-contact-phone').value = phone;
    document.getElementById('edit-contact-email').value = email;

    const editModal = new bootstrap.Modal(document.getElementById('editContactModal'));
    editModal.show();
}

async function saveEditContact() {
    const id = document.getElementById('edit-contact-id').value;
    const name = document.getElementById('edit-contact-name').value;
    const phone = document.getElementById('edit-contact-phone').value;
    const email = document.getElementById('edit-contact-email').value;

    // Validación de campos
    if (!name || !phone || !validatePhone(phone) || !validateEmail(email)) {
        alert('Por favor, ingresa un nombre, número de teléfono válido y un email válido.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, email }),
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar el contacto.');
        }

        const editModal = bootstrap.Modal.getInstance(document.getElementById('editContactModal'));
        editModal.hide();

        fetchContacts();
    } catch (error) {
        console.error('Error updating contact:', error);
    }
}

function openDeleteModal(id) {
    document.getElementById('delete-contact-id').value = id;

    const deleteModal = new bootstrap.Modal(document.getElementById('deleteContactModal'));
    deleteModal.show();
}

async function confirmDeleteContact() {
    const id = document.getElementById('delete-contact-id').value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('No se pudo eliminar el contacto.');
        }

        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteContactModal'));
        deleteModal.hide();

        fetchContacts();
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
}

// Búsqueda de contactos
function filterContacts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.phone.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm)
    );
    displayContacts(filteredContacts);
}

// Validación de número de teléfono
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phone);
}

// Validación de email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

window.onload = fetchContacts;