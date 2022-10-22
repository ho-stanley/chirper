import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Input, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PostCard from '../components/PostCard';
import PostsContainer from '../components/PostsContainer';
import { useSearch } from '../hooks/queries/useSearch';
import { searchSchema } from '../utils/validation-schema';
import { NextPageWithLayout } from './_app';

type SearchInputs = {
  keyword: string;
};

const SearchPage: NextPageWithLayout = () => {
  const [keyword, setKeyword] = useState<string>('');
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<SearchInputs>({
    resolver: zodResolver(searchSchema),
    defaultValues: { keyword: '' },
  });
  const { data: posts, isFetched } = useSearch(keyword);

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
          {posts?.length === 0 && isFetched && <Text>No posts found.</Text>}
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
