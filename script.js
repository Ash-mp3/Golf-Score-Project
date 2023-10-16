async function getCourses() {
    try {
        const response = await fetch(
            "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json",
            { mode: "cors" }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
}

async function getCoursesDetails(coursesId) {
    try {
        const response = await fetch(
            `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${coursesId}.json`,
            { mode: "cors" }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching course details:", error);
        throw error;
    }
}

// Example usage
async function fetchData() {
    try {
        const courses = await getCourses();
        console.log(courses);
        
        const courseDetails = await getCoursesDetails(11819);
        console.log(courseDetails);
    } catch (error) {
        // Handle any errors here
    }
}

fetchData();

// other way;
// async function getAvailableCourses() {
//     const url = 'https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json';
//          const response = await fetch(url);
//         const data = await response.json();
        
//         return data;
// }    
// console.log(getCoursesDetails(11819))
// let courseOptions = '';
// courses.forEach((course) => {
//     courseOptions += `option value${}`
// })
// let golfCourses = getCourses();

// for (let courses of courses) {
//     console.log(`Golf course name: ${golfCourse.name}`)
// }
