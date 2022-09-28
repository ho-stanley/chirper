import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Loading,
  Spacer,
  Text,
  Textarea,
} from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from '../components/Form';
import FormContainer from '../components/FormContainer';
import useNewPost from '../hooks/useNewPost';
import { newPostSchema } from '../utils/validation-schema';
import { NextPageWithLayout } from './_app';

type NewPostInputs = {
  title: string;
  body: string;
};

const NewPostPage: NextPageWithLayout = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPostInputs>({ resolver: zodResolver(newPostSchema) });
  const { data: post, error, loading, newPost } = useNewPost();

  const onSubmit: SubmitHandler<NewPostInputs> = (newPostData) => {
    newPost(newPostData);
  };

  useEffect(() => {
    // Redirect to newly created post page
    if (!loading && post) {
      push(`/posts/${post.id}`);
    }
  }, [loading, post, push]);

  return (
    <>
      <Head>
        <title>Chirper - New post</title>
      </Head>
      <FormContainer>
        <Text h2>New post</Text>
        {error && (
          <Text blockquote color="error">
            {error}
          </Text>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            required
            bordered
            label="Title"
            size="xl"
            aria-invalid={!!errors.title?.message}
            status={errors.title?.message ? 'error' : 'default'}
            {...register('title')}
          />
          {errors.title?.message && (
            <Text role="alert">{errors.title.message}</Text>
          )}
          <Spacer />
          <Textarea
            required
            bordered
            label="Message"
            size="xl"
            rows={6}
            aria-invalid={!!errors.body?.message}
            status={errors.body?.message ? 'error' : 'default'}
            {...register('body')}
          />
          {errors.body?.message && (
            <Text role="alert">{errors.body.message}</Text>
          )}
          <Spacer />
          <Button auto size="lg" type="submit" disabled={loading}>
            {loading ? <Loading color="currentColor" /> : <span>Send</span>}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default NewPostPage;
