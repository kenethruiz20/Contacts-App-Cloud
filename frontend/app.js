const API_URL = 'http://localhost:5001/contacts';

async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        const contacts = await response.json();
        const contactList = document.getElementById('contact-list');
        contactList.innerHTML = '';

        contacts.forEach(contact => {
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
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
}

async function addContact() {
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const email = document.getElementById('contact-email').value;

    if (!name || !phone) {
        alert('Name and phone are required!');
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
            throw new Error('Failed to add contact');
        }

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

    if (!name || !phone) {
        alert('Name and phone are required!');
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
            throw new Error('Failed to update contact');
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
            throw new Error('Failed to delete contact');
        }

        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteContactModal'));
        deleteModal.hide();

        fetchContacts();
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
}

window.onload = fetchContacts;
