import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function Dashboard() {
  const { user, error, isLoading } = useUser();

  // make sure we wait for everything to load
  if (isLoading) return <div>Loading...</div>;

  // if theres an error, show that
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Dashboard</h1>

      {/* show the user information */}
      {user && (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </>
      )}

    <div>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/api/auth/logout"><a>Logout</a></Link>
        </div>
    </div>
  )};

  export const getServerSideProps = withPageAuthRequired();