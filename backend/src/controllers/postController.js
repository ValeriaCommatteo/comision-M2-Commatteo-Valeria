import Post from "../models/post.js";

export const getPosts = async (req, res) => {
    // Obtener todos los posts
    try {
        let posts = await Post.find()
        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getPost = async (req, res) => {
    // Obtener un post por ID
    try {
        let postId = req.params.id
        let post = await Post.findById(postId)

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ error: "Post not found" })
    }
}

export const createPost = async (req, res) => {
    // Crear un nuevo post
    try {
        let { title, description, comments, imageURL } = req.body
        let newPost = new Post({
            title,
            description,
            comments,
            autor: req.user.id,
            imageURL
        })
        
        let savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch (error) {
        res.status(400).json({ error: "Error creating a new post" })
    }
}

export const updatePost = async (req, res) => {
    // Actualizar por ID
    try {
        let postId = req.params.id
        let { title, comments, imageURL } = req.body

        await Post.findByIdAndUpdate( postId, { title, comments, imageURL }, { new: true })

        res.status(201).json({
            "message": "Post has been updated"
        })

    } catch (error) {
        res.status(500).json({ error: "Error updating post" })
    }
}

export const deletePost = async (req, res) => {
    // Eliminar un post por ID
    try {
        let postId = req.params.id
        let deletedPost = await Post.findByIdAndDelete(postId)

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" })
        }
        res.status(204).end()
        
    } catch (error) {
        res.status(500).json({ error: "Error deleting post" })
    }
}