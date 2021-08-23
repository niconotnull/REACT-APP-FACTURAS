const baseURL = 'http://localhost:8080/api';

const fetchSinToken = (endPoint, data, method = 'GET') => {
  const url = `${baseURL}/${endPoint}`;
  console.log('URL : ', url);
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
};

const fetchConToken = (endPoint, data, method = 'GET') => {
  const url = `${baseURL}/${endPoint}`;
  const token = localStorage.getItem('token') || '';

  console.log('URL : ', url);
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchAuthLogin = (endPoint, data, method = 'POST') => {
  const username = 'reactapp';
  const password = '12345';

  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', data.username);
  params.append('password', data.password);

  return fetch('http://localhost:8080/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
    },
    body: params,
  }).catch((err) => console.log(err));
};

export { fetchSinToken, fetchAuthLogin, fetchConToken };
