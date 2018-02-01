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

export const _userName = 'colortel001@ucontrol.net.br';
export const _password = 'Colortel@123';
export const _tbBaseUrl = "http://35.199.71.59:8080";
export const _customerId = "2d977a80-e2a6-11e7-a2cc-0b6a5e10d27e";