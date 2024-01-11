const express = require('express');
const router = express.Router();
const { getContact,createContact,updateContact,deleteContact,getContactById } = require('./controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken)
router.route('/').get(getContact).post(createContact);

router.route('/:id').put(updateContact).delete(deleteContact).get(getContactById);

module.exports = router;