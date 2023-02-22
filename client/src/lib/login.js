export default function login(data) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
