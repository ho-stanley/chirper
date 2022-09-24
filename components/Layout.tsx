import { Navbar, Text } from '@nextui-org/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaKiwiBird } from 'react-icons/fa';
import Box from './Box';
import BurgerLink from './BurgerLink';
import NavbarAvatar from './NavbarAvatar';

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
          <Link href="/">New Post</Link>
          <Link href="/">My Posts</Link>
          <Link href="/">Search</Link>
          <Link href="/">About</Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            '@sm': {
              w: '12%',
              jc: 'flex-end',
            },
          }}
        >
          <NavbarAvatar />
        </Navbar.Content>
        <Navbar.Collapse disableAnimation disableBlur>
          <BurgerLink href="/" linkKey="home">
            Home
          </BurgerLink>
          <BurgerLink href="/chirp" linkKey="new_post">
            New post
          </BurgerLink>
          <Navbar.CollapseItem>My posts</Navbar.CollapseItem>
          <Navbar.CollapseItem>Search</Navbar.CollapseItem>
          <Navbar.CollapseItem>About</Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </Box>
  );
}
