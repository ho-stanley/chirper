import { useState } from 'react';
import RoleChangeDialog from '../components/RoleChangeDialog';
import { User } from '../types/user';

export default function useRoleChangeDialog(user: User | null) {
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };

  const RoleDialog = (
    <RoleChangeDialog user={user} visible={visible} onClose={handleClose} />
  );

  return {
    setVisible,
    RoleDialog,
  };
}
