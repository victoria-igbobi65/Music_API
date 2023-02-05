const Playlist = require('./playlistschema')


const createaPlaylist = async( object ) => {
    const newPlaylist = await Playlist.create( object )
    return newPlaylist;
}

const getPlaylists = async( object ) => {
    const playlists = Playlist.find( object )
    return playlists
}

const getaPlaylist = async( object ) => {
    const playlist = Playlist.findOne( object )
    return playlist;
} 

const deleteaPlaylist = async( id ) => {
    return Playlist.findByIdAndDelete(id)
}

/* Delete a song from a playlist */


module.exports = {
    createaPlaylist,
    getaPlaylist,
    getPlaylists,
    deleteaPlaylist
}