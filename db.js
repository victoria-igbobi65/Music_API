require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const port = process.env.PORT || 3000
const dbURl = process.env.DB_URL


mongoose.set('strictQuery', false)
mongoose
    .connect(dbURl, { useNewUrlParser: true })
    .then(() => console.log('DB connection Successful!'))

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

//HANDLING UNHANDLED REJECTIONS
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection! ...Shutting down....')
    server.close(() => {
        process.exit(1);
    }); 
})