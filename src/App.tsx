import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import Tasks from './components/Tasks';
import './App.css';

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return <>{!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Tasks />}</>;
}

export default App;
