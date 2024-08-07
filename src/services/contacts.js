import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactsById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (payload) => {
  return ContactsCollection.create(payload);
};
export const updateContact = (contactId, payload) => {
  return ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
  }); // чи буде повернуто оновлений документ //
};

export const deleteContact = (contactId) => {
  return ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
};
