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
        `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`,
        {mode: "no-cors"}
    ) .then(function (response) {
        return response.json();
    });
}


// let golfCourses = getCourses();

// for (let courses of courses) {
//     console.log(`Golf course name: ${golfCourse.name}`)
// }
