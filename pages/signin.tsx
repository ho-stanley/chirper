import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Spacer, Text } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from '../components/Form';
import FormContainer from '../components/FormContainer';
import { signinSchema } from '../utils/validation-schema';
import { NextPageWithLayout } from './_app';

type SigninInputs = {
  username: string;
  password: string;
};

const SigninPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInputs>({ resolver: zodResolver(signinSchema) });
  const [signingIn, setSigningIn] = useState(false);
  const router = useRouter();
  const [signInError, setSignInError] = useState('');

  const onSubmit: SubmitHandler<SigninInputs> = (data) => {
    setSignInError('');
    setSigningIn(true);
    const { username, password } = data;

    signIn('credentials', { username, password, redirect: false })
      .then((response) => {
        if (response) {
          if (response.ok) {
            router.replace('/');
            return;
          }
          if (response.status === 401) {
            setSignInError('Invalid username or password');
            return;
          }
          setSignInError('Sign in error');
        }
      })
      .catch(() => setSignInError('Sign in error'))
      .finally(() => setSigningIn(false));
  };

  return (
    <>
      <Head>
        <title>Chirper - Sign In</title>
      </Head>
      <FormContainer>
        <Text h2>Sign In</Text>
        {signInError && (
          <Text blockquote color="error">
            {signInError}
          </Text>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            required
            bordered
            label="Username"
            size="xl"
            aria-invalid={!!errors.username?.message}
            status={errors.username?.message ? 'error' : 'default'}
            {...register('username')}
          />
          {errors.username?.message && (
            <Text role="alert">{errors.username.message}</Text>
          )}
          <Spacer />
          <Input.Password
            required
            bordered
            label="Password"
            size="xl"
            aria-invalid={!!errors.password?.message}
            status={errors.password?.message ? 'error' : 'default'}
            {...register('password')}
          />
          {errors.password?.message && (
            <Text role="alert">{errors.password.message}</Text>
          )}
          <Spacer />
          <Button auto size="lg" type="submit" disabled={signingIn}>
            Sign In
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default SigninPage;
