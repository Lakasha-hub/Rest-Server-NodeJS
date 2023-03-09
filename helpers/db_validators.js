const Role = require('../models/role');
const User = require('../models/users');

const roleValidation = async(role = '') => {
    const exists_role = await Role.findOne({ role });
    if( !exists_role ){
        throw new Error(`The role: ${ role } does not exist`)
    }
}

const existsMail = async( mail = '' ) => {
    const exist_mail = await User.findOne({ mail });
    if ( exist_mail ){
        throw new Error(`The mail: ${ mail } is registered`)
    };
};

const existsUserByID = async( id ) => {
    const exist_user = await User.findById( id );
    if ( !exist_user ){
        throw new Error(`There is no user with id ${ id }`)
    };
};


module.exports = {
    roleValidation,
    existsMail,
    existsUserByID
}