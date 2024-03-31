'use strict';
async function testGet() {
  try {
    console.log('Testing GET');
    const response = await fetch('https://reqres.in/api/unknown/23');
    if (response.ok) {
      console.log('Promise resolved and HTTP status is successful');
      const jsonData = await response.json();
      console.log(jsonData);
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

async function testPost() {
  const data = {
    body: JSON.stringify({
      name: 'Mikko',
      job: 'Student',
    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };

  try {
    console.log('Testing POST');
    const response = await fetch('https://reqres.in/api/users', data);
    if (!response.ok) throw new Error('invalid input!');
    const jsonData = await response.json();
    console.log('response', jsonData);
  } catch (error) {
    console.log(error.message);
  }
}
async function testDelete() {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    console.log('Testing DELETE');
    const response = await fetch('https://reqres.in/api/users/2', options);
    if (response.ok) {
      console.log('Succesfully deleted');
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

async function testPut() {
  const data = {
    body: JSON.stringify({
      name: 'morpheus',
      job: 'zion resident',
    }),
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log('TESTING POST');
  try {
    console.log('Testing PUT');
    const response = await fetch('https://reqres.in/api/users/2', data);
    if (response.ok) {
      console.log('Succesfully updated');
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
async function run() {
  await testGet();
  await testPost();
  await testDelete();
  await testPut();
}
run();
