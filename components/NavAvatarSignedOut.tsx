import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import { BsPencilSquare } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';

type NavAvatarSignedOutProps = {
  push: Function;
  signIn: Function;
};

export default function NavAvatarSignedOut({
  push,
  signIn,
}: NavAvatarSignedOutProps) {
  return (
    <Dropdown placement="bottom-right">
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar text="?" color="primary" textColor="white" bordered pointer />
        </Dropdown.Trigger>
      </Navbar.Item>
      <Dropdown.Menu aria-label="User menu actions" color="primary">
        <Dropdown.Item key="profile" textValue="Not signed in">
          <Text b css={{ d: 'flex' }}>
            Not signed in
          </Text>
        </Dropdown.Item>
        <Dropdown.Item
          key="signup"
          color="primary"
          textValue="Signup"
          icon={<BsPencilSquare />}
        >
          <Text color="primary" onClick={() => push('/signup')}>
            Signup
          </Text>
        </Dropdown.Item>
        <Dropdown.Item
          key="logout"
          withDivider
          color="primary"
          textValue="Sign in"
          icon={<FiLogIn />}
        >
          <Text color="primary" onClick={() => signIn()}>
            Sign In
          </Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
