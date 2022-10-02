export interface Comment {
  id: string;
  postId: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface NewCommentData {
  body: string;
}

export interface NewCommentResponse {
  id: string;
  postId: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}

export type NewCommentInputs = {
  body: string;
};
