import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../db/validation/contact.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { convertBooleans } from '../middlewares/convertBooleans.js';
const router = express.Router();

const jsonParser = express.json();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  jsonParser,
  upload.single('photo'),
  convertBooleans,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId('contactId'),
  jsonParser,
  upload.single('photo'),
  convertBooleans,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default router;
