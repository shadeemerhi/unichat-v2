import { useSelector } from 'react-redux';
import useAuth from '../src/hooks/useAuth';
import { AppState } from '../store';

// Components
import SignIn from './SignIn';

const Home = () => {
  const userState = useSelector((state: AppState) => state.userState);
  return (
    <>
      {userState.user ? <p>{`Welcome to UniChat, ${userState.user.email}`}</p> : <p>Login or Create an Account</p>}
      <SignIn />
    </>
  );
};

export default Home;
