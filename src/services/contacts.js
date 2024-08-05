import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactsById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (payload) => {
  return ContactsCollection.create(payload);
};

export const updateContact = async (contactId, payload) => {
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true, // чи буде повернуто оновлений документ //
      upsert: false, // чи дозволяти створювати новий контакт //
    },
  );
  if (!rawResult) return null;

  return {
    contact: rawResult.value,
    isNew: false, // щоб знати документ був оновлений чи створений//
  };
};

export const deleteContact = (contactId) => {
  return ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
};
