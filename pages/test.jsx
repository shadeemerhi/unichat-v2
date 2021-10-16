import { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const userAPI = await axios.get('/users/');
        const users = userAPI.data;
        setUsers(users);
      } catch (error) {
        console.log('LOL FUCK', error);
      }
    };
    getUser();
  }, []);
  return (
    <div>
      <p>Test Component</p>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
};

export default Test;
