import { Button, Modal, Text } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteUser } from '../hooks/mutations';
import { User } from '../types/user';

type DeleteUserDialogProps = {
  user: User | null;
  visible: boolean;
  onClose: () => void;
};

const DeleteUserDialog = ({
  user,
  visible,
  onClose,
}: DeleteUserDialogProps) => {
  const {
    errorMessage,
    deleteUserMutation: { isLoading, mutate },
  } = useDeleteUser();
  const queryClient = useQueryClient();

  const modalClose = () => {
    onClose();
  };

  const onDelete = () => {
    if (user) {
      mutate(user.username, {
        onSuccess: () => {
          queryClient.invalidateQueries(['users']);
          modalClose();
        },
      });
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
          Do you want to delete user <Text b>{user?.username}</Text>?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto autoFocus color="error" onClick={modalClose}>
          No
        </Button>
        <Button auto onClick={onDelete} disabled={isLoading}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserDialog;
