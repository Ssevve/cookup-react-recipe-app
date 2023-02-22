export default function signup(data) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
