import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/ParseFilterParams.js';
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactsById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = req.body;
  const createdContact = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};

// eslint-disable-next-line no-unused-vars
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = req.body;

  const updatedContact = await updateContact(contactId, contact);

  if (updatedContact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated the contact!',
    data: updatedContact,
  });
};

// eslint-disable-next-line no-unused-vars
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContact(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found!');
  }
  res.status(204).end();
};
