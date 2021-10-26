import Head from 'next/head';

import Navbar from '../Nav/Navbar';
import AuthModal from '../Nav/AuthModal/AuthModal';

interface LayoutProps {
    children: any
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Head>
      <title>UniChat</title>
    </Head>
    <Navbar />
    <AuthModal />
    <main>{children}</main>
  </>
);

export default Layout;
