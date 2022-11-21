import { useState, useEffect } from 'react';

function useLoggedInUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('http://localhost:8000/auth', {
          credentials: 'include',
        });
        const data = await res.json();
        setUser(data.user);
        return setIsLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        return console.log(err);
      }
    }

    fetchUser();
  }, []);

  return [user, isLoading];
}

export default useLoggedInUser;
