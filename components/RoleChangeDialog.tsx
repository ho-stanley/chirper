import { Button, Col, Modal, Row, Spacer, Text } from '@nextui-org/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import Role from '../types/role.enum';
import { User } from '../types/user';

type RoleChangeDialogProps = {
  user: User | null;
  visible: boolean;
  onClose: () => void;
};

type RoleInputs = {
  role: Role;
};

const RoleChangeDialog = ({
  user,
  visible,
  onClose,
}: RoleChangeDialogProps) => {
  const { register, handleSubmit, reset } = useForm<RoleInputs>();
  const instance = useAxios();
  const [error, setError] = useState('');

  const modalClose = () => {
    reset();
    setError('');
    onClose();
  };

  const onSubmit: SubmitHandler<RoleInputs> = (data) => {
    instance
      .patch<User>(`/users/${user?.username}/role`, { ...data })
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
      <Modal.Body>
        {error}
        <Text id="modal-title" size="$lg">
          Change role for <Text b>{user?.username}</Text>
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="role">
            <Row>
              <Text size="$xl">Role</Text>
              <Spacer x={1} />
              <select
                id="role"
                {...register('role')}
                style={{ alignSelf: 'center' }}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </Row>
          </label>
          <Spacer y={0.5} />
          <Button auto type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RoleChangeDialog;
