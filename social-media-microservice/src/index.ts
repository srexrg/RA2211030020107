import express from 'express';
import { config } from './config';
import { authMiddleware } from './middleware/auth';
import userRoutes from './routes/user.route';
import postRoutes from './routes/post.route';


const app = express();
const PORT = 5000;


app.use(['/test/users', '/test/post'], authMiddleware);



app.use('/test/users', userRoutes);
app.use('/test/post', postRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export { app };