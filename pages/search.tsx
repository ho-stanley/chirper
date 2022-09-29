import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Input, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
import PostCard from '../components/PostCard';
import PostsContainer from '../components/PostsContainer';
import { Post } from '../types/post';
import { API_URL } from '../utils/config';
import { fetcher } from '../utils/http/axios-http';
import { searchSchema } from '../utils/validation-schema';
import { NextPageWithLayout } from './_app';

type SearchInputs = {
  keyword: string;
};

const SearchPage: NextPageWithLayout = () => {
  const [keyword, setKeyword] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<SearchInputs>({ resolver: zodResolver(searchSchema) });
  const { data: posts } = useSWR<Post[]>(
    keyword ? `${API_URL}/posts?keyword=${keyword}` : null,
    fetcher
  );

  const onSubmit: SubmitHandler<SearchInputs> = (data) => {
    setKeyword(data.keyword);
    resetField('keyword');
  };

  return (
    <>
      <Head>
        <title>Chirper - Search posts</title>
      </Head>
      <Container gap={1} css={{ mb: '$4' }}>
        <Text h2>Search posts</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Input
              required
              type="text"
              placeholder="Search word"
              aria-label="Search box"
              size="xl"
              fullWidth
              aria-invalid={!!errors.keyword?.message}
              status={errors.keyword?.message ? 'error' : 'default'}
              {...register('keyword')}
            />
            <Button type="submit" auto size="lg">
              Search
            </Button>
          </div>
          {errors.keyword?.message && (
            <Text role="alert">{errors.keyword.message}</Text>
          )}
        </form>

        <Spacer />
        <PostsContainer>
          {posts &&
            posts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id}>
                <div>
                  <PostCard post={post} isPressable />
                </div>
              </Link>
            ))}
        </PostsContainer>
      </Container>
    </>
  );
};

export default SearchPage;
