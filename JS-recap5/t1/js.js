'use strict';
async function testGet() {
  try {
    const response = await fetch('https://reqres.in/api/users/1');
    const jsonData = await response.json();
    console.log(jsonData);
  } catch (error) {
    console.log(error.message);
  }
}
testGet();
