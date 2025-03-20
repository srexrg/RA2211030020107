export interface User {
    id: string;
    username: string;
    postCount: number;
  }
  
  export interface Comment {
    id: string;
    userId: string;
    content: string;
    timestamp: number;
  }
  
  export interface Post {
    id: string;
    userId: string;
    content: string;
    timestamp: number;
    comments: Comment[];
  }