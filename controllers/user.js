const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/users');rol

const usersGet = async( req, res = response ) => {

    let { limit = 5, from = 0} = req.query;
    const statusActive = { status: true };

    limit = isNaN(Number(limit)) ? 5 : Number(limit);
    from = isNaN(Number(from)) ? 0 : Number(from);
    
    const [ total, users] = await Promise.all([
        User.countDocuments( statusActive ),
        User.find( statusActive ).skip( from ).limit( limit )
    ])

    res.json( {
        total,
        users
    });
}

const usersPost = async( req, res = response ) => {

    const { name, mail, role, password } = req.body;
    const user = new User({ name, mail, role, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);
    
    await user.save();

    res.json( user );
}

const usersPut = async( req, res = response ) => {

    const { id } = req.params;
    const { password, google, mail, ...otherProperties } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        otherProperties.password = bcryptjs.hashSync( password, salt );
    };

    const user = await User.findByIdAndUpdate( id, otherProperties, { new: true } );

    res.json( user );
}
const usersDelete = async( req, res = response ) => {

    const { id } = req.params;

    //Borrado Fisicamente (Se pierde integridad referencial)
    // const user = await User.findByIdAndDelete( id );

    //Borrado mediante status (Se mantiene la integridad)
    const user = await User.findOneAndUpdate( id, { status: false });

    res.json( user );
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}