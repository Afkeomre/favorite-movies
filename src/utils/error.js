const ERROR_CODES = {
  INVALID_LOGIN_CREDENTIALS: 'No user found with these credentials',
  EMAIL_EXISTS: 'This email has already been registered',
  INVALID_EMAIL: 'Your email is invalid',
  auth: 'Please sign in',
};

const error = (code) => {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Unknown error';
};

export default error;
