import { Navbar } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type BurgerLinkProps = {
  children: ReactNode;
  href: string;
  linkKey: string;
};

export default function BurgerLink({
  children,
  href,
  linkKey,
}: BurgerLinkProps) {
  const { pathname } = useRouter();

  return (
    <Navbar.CollapseItem key={linkKey} isActive={pathname === href}>
      <Link href={href}>{children}</Link>
    </Navbar.CollapseItem>
  );
}
