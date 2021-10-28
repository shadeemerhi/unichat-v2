import Head from 'next/head';

import Navbar from '../Nav/Navbar';
import AuthModal from '../Nav/AuthModal/AuthModal';
import useAuth from '../../hooks/useAuth';

interface LayoutProps {
    children: any
}

const Layout = ({ children }: LayoutProps) => {
  const { login, signup, onGoogleSignIn } = useAuth();
  return (
    <>
      <Head>
        <title>UniChat</title>
      </Head>
      <Navbar />
      <AuthModal login={login} signup={signup} onGoogleSignIn={onGoogleSignIn} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
