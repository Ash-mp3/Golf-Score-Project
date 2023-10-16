'use strict';
async function getAvaliableCourses() {
    const url= 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/';
    const response = await fetch(url);
const data = await response.json();
return data;
}