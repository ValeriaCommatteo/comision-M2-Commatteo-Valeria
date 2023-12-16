import axios from "./axios";

//obtiene tareas
export const getPostsRequest = async () => axios.get("/posts");

//obtiene solo por ID
export const getPostRequest = async (id) => axios.get(`/posts/${id}`);

// para agregar un nuevo post
export const createPostRequest = async (post) => axios.post("/posts", post);

//para actualizar
export const updatePostRequest = async (post) =>
  axios.put(`/posts/${post._id}`, post);

//para eliminar
export const deletePostRequest = async (id) => axios.delete(`/posts/${id}`);

//crear comentarios
export const createCommentRequest = async (id, comment) =>
  axios.post(`/comments/${id}`, comment);