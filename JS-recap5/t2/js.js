'use strict';
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
    const response = await fetch('https://reqres.in/api/users', data);
    if (!response.ok) throw new Error('invalid input!');
    const jsonData = await response.json();
    console.log('response', jsonData);
  } catch (error) {
    console.log(error.message);
  }
}
testPost();
