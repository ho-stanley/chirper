import { useState } from 'react';
import DeleteUserDialog from '../components/DeleteUserDialog';
import { User } from '../types/user';

export default function useDeleteUserDialog(user: User | null) {
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };

  const DeleteDialog = (
    <DeleteUserDialog user={user} visible={visible} onClose={handleClose} />
  );

  return {
    setVisible,
    DeleteDialog,
  };
}
