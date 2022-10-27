import { Button, Input, Spacer, Text } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import LoadingIndicator from '../../components/LoadingIndicator';
import { NextPageWithLayout } from '../_app';
import { signupSchema } from '../../utils/validation-schema';
import Form from '../../components/Form';
import FormContainer from '../../components/FormContainer';
import { useSignup } from '../../hooks/mutations';

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
  const {
    errorMessage,
    signupMutation: { isLoading, mutate },
  } = useSignup();

  const onSubmit: SubmitHandler<SignupInputs> = (signupData) => {
    mutate(signupData, {
      onSuccess: () => {
        push('/signup/success');
      },
    });
  };

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
        {errorMessage && (
          <Text blockquote color="error">
            {errorMessage}
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
          <Button auto size="lg" type="submit" disabled={isLoading}>
            Create account
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default SignupPage;
