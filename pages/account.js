import Router from 'next/router';
import { Layout } from '../components';
import { useAuth } from '../context/authentication';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function Account() {
  const { login, user, logout } = useAuth();

  useEffect(() => {
    if (!user || !user.token) {
      const token = Cookies.get('authToken');
    if (token) {
      const name = Cookies.get('name');

      console.log('lay, log in');
      login(token, name);
    } else {

      console.log('account, sign in');
      Router.push('/signIn');
    }
    }
  }, []);

  const handleLogOut = () => {
    console.log('account, log out');
    logout();
    Router.push('/signIn');
  };

  return (
    <Layout title={'Account'}>
      <div>
        <p>Hello {user && user.name}</p>
        <button onClick={handleLogOut}>sign out</button>
      </div>
      <style jsx>{``}</style>
    </Layout>
  );
}

export default Account;
