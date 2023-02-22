import { useState, useEffect } from 'react';

function useLoggedInUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
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
