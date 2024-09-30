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
            li.textContent = `${contact.name} - ${contact.phone} (${contact.email})`;
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

        // Clear inputs after successful addition
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-phone').value = '';
        document.getElementById('contact-email').value = '';

        // Refresh the contacts list
        fetchContacts();
    } catch (error) {
        console.error('Error adding contact:', error);
    }
}

window.onload = fetchContacts;
