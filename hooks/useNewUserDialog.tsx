import { useState } from 'react';
import NewUserDialog from '../components/NewUserDialog';

export default function useNewUserDialog() {
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };

  const UserDialog = <NewUserDialog visible={visible} onClose={handleClose} />;

  return {
    setVisible,
    UserDialog,
  };
}
