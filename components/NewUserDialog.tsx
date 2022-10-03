import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal, Spacer, Text } from '@nextui-org/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import Role from '../types/role.enum';
import { User } from '../types/user';
import { newUserSchema } from '../utils/validation-schema';

type NewUserDialogProps = {
  visible: boolean;
  onClose: () => void;
};

type UserInputs = {
  username: string;
  password: string;
  repeatPassword: string;
  role: Role;
};

const NewUserDialog = ({ visible, onClose }: NewUserDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserInputs>({ resolver: zodResolver(newUserSchema) });
  const instance = useAxios();
  const [error, setError] = useState('');

  const modalClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    instance
      .post<User>('/admin/users', { ...data })
      .then((res) => {
        modalClose();
        return res.data;
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          setError(e.message);
        }
      });
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={modalClose}
    >
      <Modal.Header>
        <Text h3 id="model-title">
          Create new user
        </Text>
      </Modal.Header>
      <Modal.Body>
        {error}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="role" style={{ display: 'block' }}>
            <Text size="$xl">Role</Text>
            <select id="role" {...register('role')}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <Spacer y={0.5} />
          <Button auto type="submit">
            Create
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewUserDialog;
