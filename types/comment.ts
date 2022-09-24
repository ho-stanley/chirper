export interface Comment {
  id: string;
  postId: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}
