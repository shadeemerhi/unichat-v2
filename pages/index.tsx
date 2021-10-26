import { useSelector } from 'react-redux';
import { AppState } from '../store';

const Home = () => {
  const userState = useSelector((state: AppState) => state.userState);
  return (
    <>
      {userState.user ? <p>{`Welcome to UniChat, ${userState.user.email}`}</p> : <p>Login or Create an Account</p>}
    </>
  );
};

export default Home;
