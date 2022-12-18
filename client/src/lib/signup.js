export default function signup(data) {
  return fetch('http://localhost:8000/auth/signup', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
