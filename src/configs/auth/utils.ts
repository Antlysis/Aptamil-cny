import Cookies from 'js-cookie';

export const saveSessionAsCookies = (token: string) => {
  Cookies.set('token', token);
};
export const removeSessionAsCookies = () => {
  Cookies.remove('token');
  Cookies.remove('name');
  Cookies.remove('language');
};
export const saveNameAsCookies = (name: string | undefined) => {
  if (name) {
    Cookies.set('name', name);
  }
};
export const saveRetailerIdAsCookies = (retailerId: string | undefined) => {
  if (retailerId) {
    Cookies.set('retailerId', retailerId);
  }
};

export const setLanguageCookie = (language: string) => {
  Cookies.set('language', language);
};

export const getLanguageCookie = () => {
  return Cookies.get('language');
}
