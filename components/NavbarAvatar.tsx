import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NavAvatarSignedOut from './NavAvatarSignedOut';
import NavAvatarSignedIn from './NavAvatarSignedIn';
import Role from '../types/role.enum';
import NavAvatarAdmin from './NavAvatarAdmin';

export default function NavbarAvatar() {
  const { data: session } = useSession();
  const { push } = useRouter();

  return (
    <>
      {/* Signed in as admin */}
      {session?.user.role === Role.Admin && (
        <NavAvatarAdmin push={push} signOut={signOut} session={session} />
      )}

      {/* Signed in */}
      {session?.user.role === Role.User && (
        <NavAvatarSignedIn signOut={signOut} session={session} />
      )}

      {/* Signed out */}
      {!session && <NavAvatarSignedOut push={push} signIn={signIn} />}
    </>
  );
}
