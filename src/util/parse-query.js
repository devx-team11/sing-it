import queryString from 'query-string';

export default (url, type) => queryString.parse(url[type]);
