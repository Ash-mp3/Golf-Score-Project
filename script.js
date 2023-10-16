async function getCourses() {
    return fetch(
        "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json",
        {mode: "no-cors"}
    ) .then(function (response) {
        return response.json();
    });
}

async function getCoursesDetails(coursesId) {
    return fetch(
        `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${coursesId}.json`,
        {mode: "no-cors"}
    ) .then(function (response) {
        return response.json();
    });
}



// other way;
async function getAvailableCourses() {
    const url = 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json';
         const response = await fetch(url);
        const data = await response.json();
        
        return data;
}    
console.log(getCoursesDetails(11819))
// let courseOptions = '';
// courses.forEach((course) => {
//     courseOptions += `option value${}`
// })
// let golfCourses = getCourses();

// for (let courses of courses) {
//     console.log(`Golf course name: ${golfCourse.name}`)
// }
