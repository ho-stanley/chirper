import { Avatar, Container, Dropdown, Navbar, Text } from '@nextui-org/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { FaKiwiBird } from 'react-icons/fa';
import Box from './Box';
import BurgerLink from './BurgerLink';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box id="container">
      <Navbar isBordered isCompact>
        <Navbar.Toggle showIn="sm" />
        <Link href="/">
          <Navbar.Brand
            css={{
              '@sm': {
                w: '20%',
              },
              color: '$primary',
              cursor: 'pointer',
            }}
          >
            <FaKiwiBird size="2rem" />
            <Text
              b
              size="$2xl"
              css={{
                ml: '$4',
              }}
            >
              Chirper
            </Text>
          </Navbar.Brand>
        </Link>
        <Navbar.Content hideIn="sm" enableCursorHighlight activeColor="primary">
          <Link href="/">Home</Link>
          <Link href="/search">New Post</Link>
          <Link href="/search">My Posts</Link>
          <Link href="/search">Search</Link>
          <Link href="/search">About</Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            '@sm': {
              w: '12%',
              jc: 'flex-end',
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  text="Username"
                  color="primary"
                  textColor="white"
                  src="https://i.pravatar.cc/150?img=3"
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
                  Username
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                Settings
              </Dropdown.Item>
              <Dropdown.Item
                key="logout"
                withDivider
                color="error"
                textValue="Logout"
              >
                <FiLogOut style={{ marginRight: '0.5rem' }} />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse disableAnimation disableBlur>
          <BurgerLink href="/" linkKey="home">
            Home
          </BurgerLink>
          <BurgerLink href="/chirp" linkKey="new_post">
            New post
          </BurgerLink>
          <Navbar.CollapseItem>My posts</Navbar.CollapseItem>
          <Navbar.CollapseItem>About</Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
      <Container gap={1}>{children}</Container>
    </Box>
  );
}
