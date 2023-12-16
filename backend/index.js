import express from 'express'
import cors from 'cors'
import './src/config/config.js'
import indexR from './src/routes/indexR.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.get("/", ( request , response) => { response.json('') })

app.use( "/api",indexR)

app.listen( process.env.PORT, () => {console.log('Servidor escuchando en el puerto ' + process.env.PORT)})