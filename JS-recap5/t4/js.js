'use strict';
async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log('Promise resolved and HTTP status is successful');
      const jsonData = await response.json();
      return jsonData;
    } else {
      if (response.status === 404) throw new Error('404, Not found');
      if (response.status === 500)
        throw new Error('500, internal server error');
      throw new Error(response.status);
    }
  } catch (error) {
    console.error('Fetch', error);
  }
}

const user = {
  name: 'John Doe',
  job: 'Developer',
};
const url = 'https://reqres.in/api/users';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
};
const userData = fetchData(url, options);
userData.then(data => console.log(data));
