import Comments from "../models/comments.js";
import User from "../models/user.js";
import Post from "../models/post.js";


export const verifyUserExists = async (req, res, next) => {

    let { email } = req.body
    let userFounded = await User.findOne({ email: email })

    if (userFounded) {
        req.user = userFounded

        next();

    } else {
        return res.status(400).json({ message: "User not found" })
    }
}

export const getComments = async (req, res) => {
    //obtiene comentarios
    try {
        let comments = await Comments.find()

        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getComment = async (req, res) => {
    //obtiene comentario
    try {
        let { id } = req.params;
        let comments = await Comments.findById(id)

        res.status(200).json(comments)

    } catch (error) {
        res.status(500).json({ error: "Comment not found" })
    }
}

export const createComments = async (req, res) => {
    //crear nuevo comentario
    try {
        let { autor, description } = req.body
        let postId = req.params.postId

        // Verificar si el autor y el post existen
        let [verifyUserExists, verifyPostExists] = await Promise.all([
            User.findById(autor),
            Post.findById(postId),
        ]);

        if (!verifyUserExists) {
            return res.status(404).json({ message: "User not found" })
        }

        if (!verifyPostExists) {
            return res.status(404).json({ message: "Post not found" })
        }

        // Crear el comentario con la referencia al post
        let newComments = new Comments({ autor, description, post: postId })

        // Guardar el comentario en la base de datos
        let commentsSaved = await newComments.save()

        // Añadir el comentario al array de comentarios del post y guardar el post actualizado
        existingPost.comments.push(commentsSaved._id)
        await existingPost.save()

        res.status(200).json(commentsSaved)
    } catch (error) {
        console.error("Error creating a new comment:", error)
        res.status(400).json({ message: "Error creating a new comment", details: error.message })
    }
};

export const deleteComments = async (req, res) => {
    //Borra un comentario
    try {
        let { id } = req.params
        let deletedComments = await Comments.findByIdAndDelete(id)

        if (!deletedComments) {
            return res.status(404).json({ error: "Commento not found" })
        }
        res.status(200).end()
    } catch (error) {
        res.status(500).json({ error: "Error deleting comment" })
    }
}

export const updatedComments = async (req, res) => {
    // Actualizar por ID
    try {
        let { id } = req.params
        let { description } = req.body
        
        await Comments.findByIdAndUpdate( id, { description }, { new: true })

        res.status(201).json({
            "message": "Comments has been updated"
        })

    } catch (error) {
        res.status(500).json({ error: "Error updating comment" })
    }
}