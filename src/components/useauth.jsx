import { useAuth } from './authprovider';

function MyComponent() {
  const { currentUser, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login('example@email.com', 'password');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div>
      {currentUser ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default MyComponent;