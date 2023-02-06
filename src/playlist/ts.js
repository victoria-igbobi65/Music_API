const { StatusCodes } = require('http-status-codes');

const CONSTANTS = require('../constants/ts')
const catchAsync = require('../utils/catchAsync')
const { getTrackId } = require('../tracks/trackservices')
const { createaPlaylist, getPlaylists, deleteaPlaylist, getaPlaylist, deleteaSong } = require('./playlistservices')


exports.newPlayList = catchAsync( async( req, res ) => {

    const userId = req.user;
    const { name } = req.body

    const playlist = await createaPlaylist( { ownerid: userId , name: name })
    res.status(StatusCodes.OK).json({
        status: true,
        msg: 'Playlist created successfully!',
        playlist: playlist
    })

})

exports.getallPlaylists = catchAsync( async( req, res ) => {

    const userId = req.user;
    const Playlists = await getPlaylists( { ownerid: userId } )

    res.status(StatusCodes.OK).json({
        status: true,
        nbhits: Playlists.length,
        playlists: Playlists
    })
})

exports.deletePlaylist = catchAsync( async( req, res ) => {

    const playlistId = req.params.id;
    await deleteaPlaylist(playlistId);

    res.status(StatusCodes.OK).json({
        status: true,
        msg: null
    })

})

exports.getplaylist = catchAsync( async( req, res) => {

    const userId = req.user;
    const playlistId = req.params.id;

    const playlist = await getaPlaylist({ ownerid: userId,  _id: playlistId })

    res.status(StatusCodes.OK).json({
        status: true,
        playlist: playlist
    })
})

exports.addaTrackToPlaylist = catchAsync( async( req, res ) => {

    const userId = req.user;
    const trackId = req.params.trackid;
    const playlistId = req.params.id;

    const track = await getTrackId( { trackid: trackId })

    /* Getting and saving song to the playlist*/
    const playlist = await getaPlaylist( { ownerid: userId, _id: playlistId });
    playlist.tracks.push(track.id)
    await playlist.save()

    res.status(StatusCodes.OK).json({
        status: true,
        playlist
    })

})

// exports.deleteaSongFromPlaylist = catchAsync( async( req, res ) => {
//     const userId = req.user;
//     const playlistId = req.params.id;
//     const trackId = req.params.trackid;

//     const track = (await getTrackId({ trackid: trackId })).id;
//     console.log(track)
//     const updated = await deleteaSong( {ownerid: userId, id: playlistId}, {body: track})

    

// })

