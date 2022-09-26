import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { BsPencilSquare } from 'react-icons/bs';
import { useRouter } from 'next/router';

export default function NavbarAvatar() {
  const { data } = useSession();
  const { push } = useRouter();

  return (
    <>
      {/* Signed in */}
      {data && (
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                text={data.user.username}
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
                {data.user.username}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider textValue="Settings">
              Settings
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
      )}

      {/* Signed out */}
      {!data && (
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                text="?"
                color="primary"
                textColor="white"
                bordered
                pointer
              />
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
      )}
    </>
  );
}
