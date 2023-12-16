import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

let uri_link = process.env.MONGO;

mongoose.connect(uri_link)
    .then( () => console.log('Database connected'))
    .catch( (err) => console.log(err) )