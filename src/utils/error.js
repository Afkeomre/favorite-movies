const ERROR_CODES = {
  INVALID_LOGIN_CREDENTIALS: 'No user found with these credentials',
  EMAIL_EXISTS: 'This email has already been registered',
  INVALID_EMAIL: 'Your email is invalid',
  ERR_NETWORK: 'Unable to load movies. TMDB might be blocked - enable VPN',
  auth: 'Please sign in',
  backdrop_locked: `Can't load movie backdrop. TMDB might be blocked. Please enable your VPN`,
  img_locked: `If you don't see any images, TMDB might be blocked in your region. Try turning on your VPN`,
};

const error = (code) => {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Unknown error';
};

export default error;
