import { Request, Response, NextFunction } from 'express';
import { 
  createPost, 
  getAllPosts as fetchAllPosts, 
  getPostById as fetchPostById, 
  updatePost as modifyPost, 
  deletePostById as removePost 
} from './postsService';

/**
 * Cria um novo post verificando se todos os parâmetros necessários estão presentes
 */
export const newPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, content, area, link } = req.body;

  try {
    // Validando 
    if (!title || !content || !area) {
      res.status(400).json({ message: 'Parameters Missing!' });
      return;
    }

    // Criando um novo post
    const newPost = await createPost(title, content, area, link);
    res.status(201).json({ message: 'Post created successfully!', post: newPost });
  } catch (error) {
    next(error); 
  }
};

/**
 * Obtém todos os posts e os retorna na resposta
 */
export const getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await fetchAllPosts();
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtém um post pelo ID e retorna os dados do post
 */
export const getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const post = await fetchPostById(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
};

/**
 * Atualiza um post pelo ID com os novos dados fornecidos
 */
export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPost = await modifyPost(id, updatedData);
    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    next(error); 
  }
};

/**
 * Deleta um post pelo ID
 */
export const deletePostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedPost = await removePost(id);
    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error); 
  }
};
