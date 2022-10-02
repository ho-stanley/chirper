import { Comment } from './comment';

export interface Post {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
  comments?: Comment[];
}

export interface NewPostData {
  title: string;
  body: string;
}

export interface NewPostResponse {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}
