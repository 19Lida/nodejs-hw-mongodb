import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constans/index.js';
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find();

  if (typeof filter.type !== 'undefined') {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

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
