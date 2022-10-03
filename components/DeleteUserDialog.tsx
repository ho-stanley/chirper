import { Button, Modal, Text } from '@nextui-org/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import useAxios from '../hooks/useAxios';
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
  const instance = useAxios();
  const [error, setError] = useState('');

  const modalClose = () => {
    onClose();
  };

  const onDelete = () => {
    instance
      .delete<User>(`/users/${user?.username}`)
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
          Do you want to delete user <Text b>{user?.username}</Text>?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto autoFocus color="error" onClick={modalClose}>
          No
        </Button>
        <Button auto onClick={onDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserDialog;
