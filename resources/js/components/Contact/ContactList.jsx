import React, {useState} from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';

function ContactList({ contacts: initialContacts }) {
    const [contacts, setContacts] = useState(initialContacts);

    const [editingContact, setEditingContact] = useState(null);
    const [isFormOpen, setFormOpen] = useState(false);

    const openForm = (contact = null) => {
        setEditingContact(contact);
        setFormOpen(true);
    };

    const closeForm = () => {
        setEditingContact(null);
        setFormOpen(false);
    };

    const saveContact = (savedContact) => {
        if (editingContact) {
            setContacts(contacts.map(contact => contact.id === savedContact.id ? savedContact : contact));
            console.log(editingContact, contacts);
        } else {
            setContacts([...contacts, savedContact]);
        }
        closeForm();
    };

    const deleteContact = (id) => {
        const confirmed = window.confirm('Вы уверены?');

        if (confirmed) {
            axios.delete(`/api/contacts/${id}`, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
                .then(response => {
                    console.log(response.data);
                    setContacts(contacts.filter(contact => contact.id !== id));
                })
                .catch(error => {
                    console.error("Ошибка при удалении контакта:", error);
                    alert("Не удалось удалить контакт. Пожалуйста, попробуйте снова.");
                });
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Список контактів</h2>
            <button
                onClick={() => openForm()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
                Створити контакт
            </button>

            {isFormOpen && (
                <ContactForm
                    contact={editingContact}
                    onSave={saveContact}
                    onCancel={closeForm}
                />
            )}

            <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">Ім'я</th>
                    <th className="py-2 px-4 border-b">Телефон</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                </tr>
                </thead>
                <tbody>
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td className="py-2 px-4 border-b">{contact.name}</td>
                        <td className="py-2 px-4 border-b">{contact.phone}</td>
                        <td className="py-2 px-4 border-b">{contact.email || '—'}</td>
                        <td className="py-2 px-4 border-b">
                            <button
                                onClick={() => openForm(contact)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                            >
                                Реагувати
                            </button>
                            <button
                                onClick={() => deleteContact(contact.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Видалити
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContactList;
