import { useSession } from 'next-auth/react';
import NavAvatarSignedOut from './NavAvatarSignedOut';
import NavAvatarSignedIn from './NavAvatarSignedIn';
import Role from '../types/role.enum';
import NavAvatarAdmin from './NavAvatarAdmin';

export default function NavbarAvatar() {
  const { data: session } = useSession();

  return (
    <>
      {/* Signed in as admin */}
      {session?.user.role === Role.Admin && <NavAvatarAdmin />}

      {/* Signed in */}
      {session?.user.role === Role.User && <NavAvatarSignedIn />}

      {/* Signed out */}
      {!session && <NavAvatarSignedOut />}
    </>
  );
}
