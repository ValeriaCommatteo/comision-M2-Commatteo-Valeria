import { Router } from "express";
import { tokenAuth } from "../middlewares/auth.js";
import { createComments, deleteComments, getComment, getComments, updatedComments } from "../controllers/commentsController.js";

const router = Router();

router.get('/comments', getComments);
router.get('/comments/:id', getComment);
router.post('/comments/:postId', tokenAuth, createComments);
router.delete('/comments/:id', tokenAuth, deleteComments);
router.put('/comments/:id', tokenAuth, updatedComments); 

export default router