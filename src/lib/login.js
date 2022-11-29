export default function login(data) {
  return fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
