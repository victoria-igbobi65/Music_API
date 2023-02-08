const jwt = require('jsonwebtoken')
const CONSTANTS = require('../constants/ts')
const crypto = require('crypto')
const {promisify} = require('util')
const mongoose  = require('mongoose')
const { object } = require('joi')
require('dotenv').config()



exports.signtoken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY)
}


exports.setCookies = (res, tokenName, token) => {

    return res.cookie(tokenName, token, {
        httpOnly: true,
        secure: CONSTANTS.APP_ENV.PRODUCTION,
    })

}

exports.clearCookies = (res, tokenName) => {

    return res.clearCookie(tokenName, {
        httpOnly: true,
        secure: CONSTANTS.APP_ENV.PRODUCTION,
    })
    
}

exports.hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex')

}

exports.buildQuery = (object) => {
    return object
}

exports.decodeToken = async (token) => {
    return promisify(jwt.verify)(token, process.env.SECRET_KEY)
}

exports.destructureObject = ( object ) => {

    const {
        id,
        name,
        preview_url,
        album: {
            images,
            album_type,
            release_date,
            artists: [{ 
                name: artistName, 
                type: artistType }],
        },
    } = object
    
    const imagesUrl = images.map(({ url }) => url)
    return {
        trackid: id,
        name: name,
        previewurl: preview_url,
        artistname: artistName,
        artisttype: artistType,
        releasedate: release_date,
        images: imagesUrl,
        albumtype: album_type
    }
}

exports.randomLetter = () => {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
    return alphabets[ Math.floor( Math.random() * 36 ) ]

}

exports.convertToMongooseObject = ( string ) => {

    return mongoose.Types.ObjectId( string )
}

exports.buildQueryObject = ( object ) => {

    let sortBy;
    if (object.sort){
        sortBy = object.sort.split(',').join(" ")
    }
    else{
        sortBy = '-createdAt'
    }

    return sortBy;
}

