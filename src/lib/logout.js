export default function logout() {
  return fetch('http://localhost:8000/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
}
