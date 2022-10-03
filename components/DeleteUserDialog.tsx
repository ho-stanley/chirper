import { Button, Modal, Text } from '@nextui-org/react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import useAxios from '../hooks/useAxios';
import { User } from '../types/user';
import { API_URL } from '../utils/config';

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
  const { mutate } = useSWRConfig();

  const modalClose = () => {
    setError('');
    onClose();
  };

  const onDelete = () => {
    instance
      .delete<User>(`/users/${user?.username}`)
      .then((res) => {
        mutate(`${API_URL}/users`);
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
