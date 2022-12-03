
//Se importa el modelo para poder validar contra la base de datos
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async( role = '' ) =>{

    const existeRole = await Role.findOne({ role }); 
    if( !existeRole ){
        throw new Error( `The role ${role} is not registered in the database` );
    };

};


const emailExiste = async( email = '' ) =>{

    const existeEmail = await Usuario.findOne({ email });
    if( existeEmail ){
        throw new Error( `El email: ${email}, ya está registrado` );
    };

};


const existeUsuarioPorId = async( id = '' ) =>{

    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error( `El ID: ${email}, no existe` );
    };

};



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
}