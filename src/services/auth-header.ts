export default function authHeader() {
  const cookies = document.cookie;
  const cookieArray = cookies.split(';');

  let accessToken = '';

  for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith('airbnb=')) {
          accessToken = cookie.substring('airbnb='.length);
          break;
      }
  }

  if (accessToken) {
      return { Authorization: 'Bearer ' + accessToken };
  }

  return {};
}
