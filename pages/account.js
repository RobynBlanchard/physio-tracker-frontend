import Router from 'next/router';
import { Layout } from '../components';
import { useAuth } from '../context/authentication';
import { useEffect } from 'react';
import Cookie from 'js-cookie';
// TODO: on refresh if cookie in storage then log in

function Account() {
  const { logout, user } = useAuth();

  useEffect(() => {
    if (!user || !user.token) {
      Router.push('/signIn');
    }
  }, []);

  const handleLogOut = () => {
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
