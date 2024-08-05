import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = express.Router();

const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', jsonParser, ctrlWrapper(createContactController));

router.patch('/:contactId', jsonParser, ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
