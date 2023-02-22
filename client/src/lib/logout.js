export default function logout() {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}
