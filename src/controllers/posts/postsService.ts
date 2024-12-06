import postModel from '../../models/postModel';

/**
 * Cria um novo post no banco de dados
 * @param title - O título do post
 * @param content - O conteúdo do post
 * @param area - A área do post (por exemplo, tecnologia, ciência, etc.)
 * @param link - O link relacionado ao post
 */
export const createPost = async (title: string, content: string, area: string, link?: string) => {
  const newPost = await postModel.create({ title, content, area, link });
  return newPost;
};

/**
 * Obtém todos os posts do banco de dados
 */
export const getAllPosts = async () => {
  const posts = await postModel.find();
  return posts;
};

/**
 * Obtém um post pelo ID
 * @param id - O ID do post
 */
export const getPostById = async (id: string) => {
  const post = await postModel.findById(id);
  return post;
};

/**
 * Atualiza um post pelo ID
 * @param id - O ID do post a ser atualizado
 * @param updatedData - Os dados para atualização (como title, content, area, link, etc.)
 */
export const updatePost = async (id: string, updatedData: { title?: string; content?: string; area?: string; link?: string }) => {
  const updatedPost = await postModel.findByIdAndUpdate(id, updatedData, { new: true });
  return updatedPost;
};

/**
 * Deleta um post pelo ID
 * @param id - O ID do post a ser deletado
 */
export const deletePostById = async (id: string) => {
  const deletedPost = await postModel.findByIdAndDelete(id);
  return deletedPost;
};
