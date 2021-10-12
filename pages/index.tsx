import { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import { AppState } from '../store';

// Components
import SignIn from './SignIn';
import TransitionModal from '../src/components/Nav/AuthModal';

const Home = () => {
  const counter = useSelector((state: AppState) => state.counter);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TransitionModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
      <SignIn handleOpen={handleOpen} />
    </div>
  );
};

export default Home;
