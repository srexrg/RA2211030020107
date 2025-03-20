import { Router, Request, Response } from 'express';
import { getAllUsers, getUserPosts } from '../service/api-service';

const router = Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const authToken = res.locals.authToken;
    console.log('authToken:', authToken);
    const users = await getAllUsers(authToken);
    
    const sortedUsers = [...users].sort((a, b) => b.postCount - a.postCount);
    
    res.json(sortedUsers.slice(0, 5));
  } catch (error) {

    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get posts by user ID
router.get('/:userId/post', async (req: Request, res: Response) => {
  try {
    const authToken = res.locals.authToken;
    const userId = req.params.userId;
    const posts = await getUserPosts(userId, authToken);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

export default router;