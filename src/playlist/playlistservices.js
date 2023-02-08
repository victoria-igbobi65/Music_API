const Playlist = require('./playlistschema')


const createaPlaylist = async( object ) => {
    const newPlaylist = await Playlist.create( object )
    return newPlaylist;
}

const getPlaylists = async( object, sortBy ) => {
    const playlists = Playlist.find( object ).sort( sortBy )
    return playlists
}

const getaPlaylist = async( object ) => {
    const playlist = Playlist.findOne( object )
    return playlist;
} 

const deleteaPlaylist = async( id ) => {
    return Playlist.findByIdAndDelete(id)
}

const updateaPlaylist = async( playlistDetails, songObject ) => {
    return Playlist.updateOne( playlistDetails, songObject )
}

module.exports = {
    createaPlaylist,
    getaPlaylist,
    getPlaylists,
    deleteaPlaylist,
    updateaPlaylist
}