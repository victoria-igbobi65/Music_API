# MUSIC API
---
---

### Tracks

This is a music API for Music metadata.
 1. users can search for songs
 2. get informations about a certain track
 3. like a track, share a track with other users
 4. unlike a track, dislike a track
 5. get all tracks related to a track
 6. get New Release
 7. get a list of random tracks
 8. get tracks under an album, 


### Playlist
1. users can create their playlists
2. get all their playlists
3. delete a playlist
4. get all tracks in a playlist
5. add a track to a playlist
6. delete a song from a playlist
7. delete all songs from a playlist
8. get Spotify featured playlists
9. get all tracks in a spotify playlist


### Me
1. users can get all their played tracks
2. users can get all their liked tracks
3. users can get their frequently played tracks
4. users can get track recommendations based on their likes and listening history


### Category
1. users can get categories
2. users can get tracks under a category
3. users can get playlists under a category


### Authentication
1. users can sign up to application
2. users can login to application
3. users can logout from application
4. forgot password routes
5. admin registraction


### Artists
1. users can get information about an artist
2. users can get a list of several artists
3. users can get an artist's popular tracks
4. users can get a list of artists related to an artist
5. users can get a list of albums by an artist


### Admin
1. admin can suspend a user
2. admin can unsuspend a user

---
---
## SETUP

* Install nodejs
* fork this repository
* clone this repository
* update env with .env
* run `npm run dev` to run this project.

---
---

## API ENDPOINTS

### Signup user
* route: auth/signup
* Method: POST
* Body: {
    firstname: user firstname [ required ],
    lastname: user lastname [ required],
    username: username [unique user identifier, required],
    email: email [ required ],
    password: password [ required ]
    phonenumber: phonenumber [ optional ],
    gender: gender [ "female" || "male", optional ],
    profilepicurl: profilepicurl [ optional ]
}

* Response status
    200: success,
    400: error

***

### User Login
* route: auth/login
* Method: POST,
* Body: {
    email: email [ required ],
    password: password [ required ]
}
* Response Status
    200: success,
    400: error
    

***

### User Logout
* route: auth/logout
* Method: POST
* Response Status
    200: success,
    400: error

***

###Forgot Password
* route: auth/forgotPassword
* Method: POST,
* Body: {
    email: email [ required ]
}
* Response Status
    200: success,
    400: error


***
### Reset Password
* route: auth/resetPassword/:token
* Method: POST
* Body: {
    password: password [ required ]
}
* Response Status
    200: success
    400: error


***
### Admin Signup
* route: auth/admin/signup
* Method: POST
* Body: {

    firstname: user firstname [ required ],
    lastname: user lastname [ required],
    username: username [unique user identifier, required],
    email: email [ required ],
    password: password [ required ]
    phonenumber: phonenumber [ optional ],
    gender: gender [ "female" || "male", optional ],
    profilepicurl: profilepicurl [ optional ]

}
* Respone Status
    200: success
    400: error
