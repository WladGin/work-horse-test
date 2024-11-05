// ContactForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContactForm({ contact, onSave, onCancel }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (contact) {
            setName(contact.name || '');
            setPhone(contact.phone || '');
            setEmail(contact.email || '');
        }
    }, [contact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const contactData = { name, phone, email };
        if (contact?.id) {
            axios.put(`/api/contacts/${contact.id}`, contactData, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
                .then(response => {
                    onSave(response.data);
                })
                .catch(error => {
                    console.error("Помилка при оновленні контакту: ", error);
                    let msg = "Не вдалося оновити контакт.";

                    if (error.response.status === 422) {
                        msg += " Помилка: " + JSON.stringify(error.response.data.message);
                    } else {
                        msg += ' Спробуйте ще раз пізніше.';
                    }

                    alert(msg);
                });
        } else {
            axios.post('/api/contacts', contactData, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
                .then(response => {
                    onSave(response.data);
                })
                .catch(error => {
                    let msg = "Не вдалося створити контакт.";

                    if (error.response.status === 422) {
                        msg += " Помилка: " + JSON.stringify(error.response.data.message);
                    } else {
                        msg += ' Спробуйте ще раз пізніше.';
                    }

                    alert(msg);
                });
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-xl font-semibold mb-4">{contact ? 'Редагувати контакт' : 'Створити контакт'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Ім'я</label>
                    <input type="text"
                           value={name} onChange={(e) => setName(e.target.value)}
                           className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
                           required/>

                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Телефон</label>
                    <input type="text"
                           value={phone} onChange={(e) => setPhone(e.target.value)}
                           className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
                           required/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input type="email"
                           value={email} onChange={(e) => setEmail(e.target.value)}
                           className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                        {contact ? 'Оновити контакт' : 'Створити контакт'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Відмінити
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
