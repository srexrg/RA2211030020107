import axios from 'axios';
import { config } from '../config';
import { User, Post, Comment } from '../types';


export async function fetchFromAPI(endpoint: string, authToken: string): Promise<any> {
  try {
    // Check if the token already has 'Bearer' prefix to avoid duplication
    const formattedToken = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
    
    const response = await axios.get(`${config.api.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': formattedToken
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching from API (${endpoint}):`, error);
    throw error;
  }
}


export async function getAllUsers(authToken: string): Promise<User[]> {
  return await fetchFromAPI('/test/users', authToken);
}


export async function getAllPosts(authToken: string): Promise<Post[]> {
  return await fetchFromAPI('/posts', authToken);
}

export async function getPostComments(postId: string, authToken: string): Promise<Comment[]> {
  return await fetchFromAPI(`/test/post/${postId}/comments`, authToken);
}

export async function getUserPosts(userId: string, authToken: string): Promise<Post[]> {
  return await fetchFromAPI(`/test/users/${userId}/post`, authToken);
}