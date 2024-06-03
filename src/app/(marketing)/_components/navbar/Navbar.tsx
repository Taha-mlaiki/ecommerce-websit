import Container from '@/components/Container';
import Link from 'next/link';
import NavLinks from './NavLinks';
import { db } from '../../../../../prisma/client';
import NavActions from './NavActions';
import UserMenu from '@/components/navbar/UserMenu';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

const Navbar = async () => {
  const categories = await db.category.findMany();
  const session = await auth();
  return (
    <header className="border-b">
      <Container className="flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-extrabold hidden sm:block ">
          STORE BALL
        </Link>
        <NavLinks data={categories} />
        <div className="flex items-center gap-4">
          <NavActions />
          {session?.user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/login">login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/register">register</Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
