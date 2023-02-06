const Suspend = require('./suspensionschema')


const createSuspend = async( object ) => {
    const newSus = await Suspend.create( object );
    return newSus;
}


module.exports = { createSuspend }