import './bootstrap';

import React from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';

import App from './components/App';
import ContactList from './components/Contact/ContactList';

// ReactDOM.createRoot(document.getElementById('app')).render(<App/>);

const container = document.getElementById('app');

document.addEventListener('DOMContentLoaded', () => {
    const contactListContainer = document.getElementById('contact_list');
    if (contactListContainer) {
        const dataContacts = contactListContainer.getAttribute('data-contacts');
        if (dataContacts) {
            try {
                const contacts = JSON.parse(dataContacts);
                const root = createRoot(contactListContainer);
                root.render(<ContactList contacts={contacts} />);
            } catch (error) {
                console.error("Помилка при розбору JSON:", error);
            }
        } else {
            console.warn("Атрибут data-contacts відсутній або пустий");
        }
    }
});
