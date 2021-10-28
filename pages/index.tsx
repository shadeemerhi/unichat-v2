import { useSelector } from 'react-redux';
import { UserState } from '../src/reducers/user';
import { AppState } from '../store';

const Home = () => {
  const userState: UserState = useSelector((state: AppState) => state.userState);
  return (
    <>
      {userState.user ? <p>{`Welcome to UniChat, ${userState.user.username || userState.user.email}`}</p> : <p>Login or Create an Account</p>}
    </>
  );
};

export default Home;
