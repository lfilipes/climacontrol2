// src/app/core/env.config.ts
const _isDev = window.location.port.indexOf('4200') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};
const apiURI = _isDev ? 'http://localhost:8083/api/' : `/api/`;

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI
};

export const _userName = 'lfilipe.email@gmail.com';
export const _password = 'lfs123';
export const _tbBaseUrl = "http://192.168.15.16:8080";
export const _customerId = "194cf2b0-d06f-11e7-9c2a-5997ca966e82";