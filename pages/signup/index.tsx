import { Button, Input, Loading, Spacer, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Head from 'next/head';
import LoadingIndicator from '../../components/LoadingIndicator';
import { NextPageWithLayout } from '../_app';
import { signupSchema } from '../../utils/validation-schema';
import Form from '../../components/Form';
import useSignup from '../../hooks/useSignup';
import FormContainer from '../../components/FormContainer';

type SignupInputs = {
  username: string;
  password: string;
  repeatPassword: string;
};

const SignupPage: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({ resolver: zodResolver(signupSchema) });
  const { data, error, loading, signup } = useSignup();

  const onSubmit: SubmitHandler<SignupInputs> = (signupData) => {
    signup(signupData);
  };

  useEffect(() => {
    // Redirect to success page if user was successfully created
    if (!loading && data) {
      push('/signup/success');
    }
  }, [loading, data, push]);

  if (status === 'loading') return <LoadingIndicator />;
  // Redirect to index page if user is signed in
  if (session) push('/');

  return (
    <>
      <Head>
        <title>Chirper - Signup</title>
      </Head>
      <FormContainer>
        <Text h2>Signup</Text>
        {error && (
          <Text blockquote color="error">
            {error}
          </Text>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            required
            bordered
            autoComplete="true"
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
          <Input.Password
            required
            bordered
            label="Repeat password"
            size="xl"
            aria-invalid={!!errors.repeatPassword?.message}
            status={errors.repeatPassword?.message ? 'error' : 'default'}
            {...register('repeatPassword')}
          />
          {errors.repeatPassword?.message && (
            <Text role="alert">{errors.repeatPassword.message}</Text>
          )}
          <Spacer />
          <Button auto size="lg" type="submit" disabled={loading}>
            {loading ? (
              <Loading color="currentColor" />
            ) : (
              <span>Create account</span>
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default SignupPage;
