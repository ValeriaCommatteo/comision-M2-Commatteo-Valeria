import { Router } from "express"; 
import commentsR from '../routes/commentsR.js'
import postR from '../routes/postR.js'
import authR from '../routes/authR.js'

const indexR = Router(); 

indexR.use("/comments", commentsR)
indexR.use("/post", postR)
indexR.use("/user", authR)

export default indexR