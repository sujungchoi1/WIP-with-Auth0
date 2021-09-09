import Link from 'next/link';
import { useUser, getSession } from '@auth0/nextjs-auth0';
import { Menu } from 'semantic-ui-react';
import navStyles from '../styles/Nav.module.css';

const Navbar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className={navStyles.nav}>
      <div className="nav-left">
        <Link href="/">
          <a> <h3>🧶 Work in Progress </h3></a>
        </Link>
      </div>

      <div className="nav-right">
        {/* user is not logged in */}
        {/* gets 404 error if Link is used for login/logout link */}
        {/* {!user && <Link href="/api/auth/login"><a><h3>Login</h3></a></Link>} */}
        {!user && <a href="/api/auth/login"><h3>Login</h3></a>}

        {/* user is logged in */}
        {/* show user info and logout button */}
        {user && (
          <div style={{ 'display': 'flex' }}>
            <p>Hi {user.name}!</p>
            <a href="/api/auth/logout"><h3>Logout</h3></a>
          </div>
        )}
      </div>



    </nav>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const session = getSession(req, res);

  return {
    props: { user: session?.user ?? null }
  }
}

export default Navbar
