import { Button, Modal, Row, Spacer, Text } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRoleChange } from '../hooks/mutations';
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
  const {
    errorMessage,
    roleChangeMutation: { isLoading, mutate },
  } = useRoleChange();
  const queryClient = useQueryClient();

  const modalClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<RoleInputs> = (data) => {
    if (user) {
      mutate(
        { username: user.username, role: data.role },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            modalClose();
          },
        }
      );
    }
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={modalClose}
    >
      <Modal.Body>
        {errorMessage}
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
          <Button auto type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RoleChangeDialog;
