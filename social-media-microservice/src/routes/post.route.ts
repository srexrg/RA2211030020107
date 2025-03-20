import { Router, Request, Response } from 'express';
import { getPostComments, getUserPosts } from '../service/api-service';

const router = Router();

// GET post comments
router.get('/:postId/comments', async (req: Request, res: Response) => {
  try {
    const authToken = res.locals.authToken;
    const postId = req.params.postId;
    const comments = await getPostComments(postId, authToken);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching post comments:', error);
    res.status(500).json({ error: 'Failed to fetch post comments' });
  }
});

export default router;