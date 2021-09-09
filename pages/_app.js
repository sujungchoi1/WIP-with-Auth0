// import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout';
import 'semantic-ui-css/semantic.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout><Component {...pageProps} /></Layout>
    </UserProvider>
  );
}

export default MyApp
