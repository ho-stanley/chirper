import { Navbar, Text, Link as UiLink } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { FaKiwiBird } from 'react-icons/fa';
import Box from './Box';
import NavbarAvatar from './NavbarAvatar';

type LayoutProps = {
  children: ReactNode;
};

const menuItems = [
  { label: 'Home', href: '/', key: 'home' },
  { label: 'New Post', href: '/', key: 'new_post' },
  { label: 'My Posts', href: '/my-posts', key: 'my_posts' },
  { label: 'Search', href: '/', key: 'search' },
];

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  /**
   * NextUI navbar component does not support hiding the toggle menu
   * after an item is selected. We need to use a custom solution in
   * the meantime.
   */
  useEffect(() => {
    // Enable scrolling again after closing Navbar.Collapse
    document.body.style.overflow = '';
    if (isSideMenuOpen) document.body.style.overflow = 'hidden';
  }, [isSideMenuOpen]);

  // Toggles side menu when we pass flag={true}
  const handleSideMenu = (flag = false) => {
    if (flag) setIsSideMenuOpen(!isSideMenuOpen);
    if (isSideMenuOpen) setIsSideMenuOpen(false);
  };

  return (
    <Box id="container">
      <Navbar isBordered isCompact>
        <Navbar.Toggle
          showIn="sm"
          isSelected={isSideMenuOpen}
          onChange={() => handleSideMenu(true)}
        />
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
          {menuItems.map((item) => (
            <Link href={item.href} key={item.key}>
              {item.label}
            </Link>
          ))}
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
        <Navbar.Collapse disableAnimation disableBlur isOpen={isSideMenuOpen}>
          {menuItems.map((item) => (
            <Navbar.CollapseItem
              key={item.key}
              isActive={pathname === item.href}
            >
              <Link href={item.href} passHref>
                <UiLink color="inherit" onClick={() => handleSideMenu(true)}>
                  {item.label}
                </UiLink>
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
      {children}
    </Box>
  );
}
