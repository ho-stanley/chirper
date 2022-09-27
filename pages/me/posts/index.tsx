import { Container, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr';
import ErrorIndicator from '../../../components/ErrorIndicator';
import LoadingIndicator from '../../../components/LoadingIndicator';
import PostCard from '../../../components/PostCard';
import PostsContainer from '../../../components/PostsContainer';
import { Post } from '../../../types/post';
import { API_URL } from '../../../utils/config';
import { fetcher } from '../../../utils/http/axios-http';
import { NextPageWithLayout } from '../../_app';

const MyPostsPage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const { data: posts, error } = useSWR<Post[]>(
    session?.user ? `${API_URL}/posts?userId=${session.user.id}` : null,
    fetcher
  );

  if (error) return <ErrorIndicator />;
  if (!posts) return <LoadingIndicator />;

  return (
    <Container gap={1}>
      <Text h2>My posts</Text>
      <PostsContainer>
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div>
              <PostCard post={post} isPressable />
            </div>
          </Link>
        ))}
      </PostsContainer>
    </Container>
  );
};

export default MyPostsPage;
