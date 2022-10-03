import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import { Session } from 'next-auth';
import { FiLogOut } from 'react-icons/fi';

type NavAvatarAdminProps = {
  push: Function;
  signOut: Function;
  session: Session;
};

export default function NavAvatarAdmin({
  push,
  signOut,
  session,
}: NavAvatarAdminProps) {
  return (
    <Dropdown placement="bottom-right">
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar
            text={session.user.username}
            color="primary"
            textColor="white"
            bordered
            pointer
          />
        </Dropdown.Trigger>
      </Navbar.Item>
      <Dropdown.Menu aria-label="User menu actions" color="primary">
        <Dropdown.Item
          key="profile"
          css={{ h: '$18' }}
          textValue="Signed in as"
        >
          <Text b css={{ d: 'flex' }}>
            Signed in as
          </Text>
          <Text b css={{ d: 'flex' }}>
            {session.user.username}
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="manage-users" withDivider textValue="Manage users">
          <Text onClick={() => push('/a')}>Manage users</Text>
        </Dropdown.Item>
        <Dropdown.Item
          key="logout"
          withDivider
          color="error"
          textValue="Logout"
          icon={<FiLogOut />}
        >
          <Text color="error" onClick={() => signOut({ callbackUrl: '/' })}>
            Logout
          </Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
