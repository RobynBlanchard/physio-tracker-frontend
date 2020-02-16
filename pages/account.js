import Router from 'next/router';
import { Layout } from '../components';
import { useAuth } from '../context/authentication';
import { useEffect } from 'react';

function Account() {
  const { user, logout } = useAuth();
  console.log(user)

  useEffect(() => {
    if (!user || !user.token) {
      console.log('did mount in account, no token => redirect => sign in');
      Router.push('/signIn');
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
