import { useSelector } from 'react-redux';

import SignIn from './SignIn';
import { AppState } from '../store';

const Home = () => {
  const counter = useSelector((state: AppState) => state.counter);

  return (
    <div>
      <p>{counter}</p>
      <SignIn />
    </div>
  );
};

export default Home;
