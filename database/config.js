const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('Base de Datos Online...');

    } catch (error) {
        console.log(error);
        throw new Error('Error al Inicializar la Base de Datos');
    }


};



module.exports = {
    dbConnection
}


