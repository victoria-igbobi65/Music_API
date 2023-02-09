const { StatusCodes } = require('http-status-codes');

const CONSTANTS = require('../constants/ts')
const HELPER = require('../utils/helper')
const catchAsync = require('../utils/catchAsync')
const { getTrackId, createTrack, apiCall } = require('../tracks/trackservices')
const { createaPlaylist, getPlaylists, deleteaPlaylist, getaPlaylist, updateaPlaylist } = require('./playlistservices');
const AppError = require('../utils/appError');


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
    const Playlists = await getPlaylists( { ownerid: userId }, HELPER.buildQueryObject( req.query ) )

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

    /* Query our music database for the song ID */
    let song = await getTrackId( { trackid: trackId } );

    if (!song){
        const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}tracks/${trackId}`
        const track = await apiCall(url)

        if (track.error){
            throw new AppError('An error occurred!', StatusCodes.BAD_REQUEST)
        }
        const object = HELPER.destructureObject(track)
        song = await createTrack( object )
    }

    /* Fetch desired playlist */
    const playlist = await getaPlaylist({ ownerid: userId, _id: playlistId })

    if (!playlist.tracks.some((track) => track._id.equals( HELPER.convertToMongooseObject( song._id )))){
        playlist.tracks.push(song._id)
        await playlist.save()
    }
    
    res.status(StatusCodes.OK).json({
        status: true,
        playlist
    })

})

exports.deleteaSongFromPlaylist = catchAsync( async( req, res ) => {
    const userId = req.user;
    const playlistId = req.params.id;
    const trackId = req.params.trackid;

    const track = await getTrackId({ trackid: trackId })
    await updateaPlaylist( { _id: playlistId }, { $pull: { tracks: { _id: track._id } } } )
    const playlist = await getaPlaylist({ ownerid: userId, _id: playlistId })
   
     res.status( StatusCodes.OK ).json({
        status: true,
        playlist
        
     })
})

exports.deleteallSongsFromPlaylist = catchAsync( async( req, res) => {

    const playlistId = req.params.id
    const userId = req.user;

    await updateaPlaylist({ _id: playlistId }, { $set: { tracks: []}})
    const playlist = await getaPlaylist({ ownerid: userId, _id: playlistId })

    res.status( StatusCodes.OK ).json({
        status: true,
        playlist
    })
})


exports.getFeaturedPlaylist = catchAsync( async( req, res) => {
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}browse/featured-playlists`
    const featured = await apiCall( url )

    if (featured.error){
        throw new AppError( featured.error.message, featured.error.status)
    }

    res.status( StatusCodes.OK ).json({
        status: true,
        nhbits:featured.playlists.items.length,
        featured
    })
})


exports.getalltracksinPlaylist = catchAsync( async(req, res) => {

    const playlistId = req.params.id;
    const url = `${CONSTANTS.LINKS.SPOTIFYREQUESTBASEURL}playlists/${playlistId}/tracks`
    const tracks = await apiCall( url )

    res.status( StatusCodes.OK ).json({ 
        status: true,
        nhbits: tracks.items.length,
        tracks
    })
})