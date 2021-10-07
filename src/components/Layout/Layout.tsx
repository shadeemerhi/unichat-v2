import Navbar from '../Nav/Navbar';

type LayoutProps = {
    children: any
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default Layout;
