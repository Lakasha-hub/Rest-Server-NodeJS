const { Router } = require('express');
const { check } = require('express-validator');
const { roleValidation, existsMail, existsUserByID } = require('../helpers/db_validators');
const { validateCamps } = require('../middlewares/validate-camps');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/user');

const router = Router();

router.get('/', usersGet );

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('mail', 'The email is not valid').isEmail(),
    check('mail', 'The mail is already registered').custom( existsMail ),
    check('password', 'The password must have a minimum of 8 characters').isLength({ min: 8 }),
    check('role').custom( roleValidation ),
    validateCamps
],usersPost );

router.put('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom( existsUserByID ),
    check('role').custom( roleValidation ),
    validateCamps
], usersPut );

router.delete('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom( existsUserByID ),
    validateCamps
], usersDelete );



module.exports = router;