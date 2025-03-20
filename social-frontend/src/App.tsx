import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// Types from backend
interface User {
  id: string;
  username: string;
  postCount: number;
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
}

interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  comments: Comment[];
}


const API_BASE_URL = 'http://localhost:5000';

function App() {

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [authToken, setAuthToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authToken) {
      fetchUsers();
    }
  }, [authToken]);


  useEffect(() => {
    if (selectedUser && authToken) {
      fetchUserPosts(selectedUser);
    }
  }, [selectedUser, authToken]);


  useEffect(() => {
    if (selectedPost && authToken) {
      fetchPostComments(selectedPost);
    }
  }, [selectedPost, authToken]);


  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/test/users`, {
        headers: {
          'Authorization': authToken
        }
      });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserPosts = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/test/users/${userId}/post`, {
        headers: {
          'Authorization': authToken
        }
      });
      setUserPosts(response.data);
      setSelectedPost(null); 
      setPostComments([]); 
    } catch (err) {
      setError('Failed to fetch user posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPostComments = async (postId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/test/post/${postId}/comments`, {
        headers: {
          'Authorization': authToken
        }
      });
      setPostComments(response.data);
    } catch (err) {
      setError('Failed to fetch post comments');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Social Media App</h1>
        <div className="auth-container">
          <input
            type="text"
            placeholder="Enter your auth token"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            className="auth-input"
          />
          <button onClick={fetchUsers} disabled={!authToken}>
            Login
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}
      
      <div className="content-container">
        {/* Users section */}
        <div className="users-section">
          <h2>Top Users</h2>
          {isLoading && !users.length ? <p>Loading users...</p> : (
            <ul className="users-list">
              {users.map((user) => (
                <li 
                  key={user.id} 
                  className={selectedUser === user.id ? 'selected' : ''}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <span className="username">{user.username}</span>
                  <span className="post-count">{user.postCount} posts</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Posts section */}
        {selectedUser && (
          <div className="posts-section">
            <h2>Posts by {users.find(u => u.id === selectedUser)?.username || 'User'}</h2>
            {isLoading && !userPosts.length ? <p>Loading posts...</p> : (
              userPosts.length ? (
                <ul className="posts-list">
                  {userPosts.map((post) => (
                    <li 
                      key={post.id} 
                      className={selectedPost === post.id ? 'selected' : ''}
                      onClick={() => setSelectedPost(post.id)}
                    >
                      <div className="post-content">{post.content}</div>
                      <div className="post-date">{formatDate(post.timestamp)}</div>
                    </li>
                  ))}
                </ul>
              ) : <p>No posts found for this user</p>
            )}
          </div>
        )}


        {selectedPost && (
          <div className="comments-section">
            <h2>Comments</h2>
            {isLoading && !postComments.length ? <p>Loading comments...</p> : (
              postComments.length ? (
                <ul className="comments-list">
                  {postComments.map((comment) => (
                    <li key={comment.id}>
                      <div className="comment-content">{comment.content}</div>
                      <div className="comment-date">{formatDate(comment.timestamp)}</div>
                    </li>
                  ))}
                </ul>
              ) : <p>No comments found for this post</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
