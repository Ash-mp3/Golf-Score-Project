
//setting current TeeType default
let currentTeeType;
let currentGolfCourse;
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

// async function getCoursesDetails(coursesId) {
//   try {
//     const response = await fetch(
//       `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${coursesId}.json`,
//       { mode: "cors" }
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching course details:", error);
//     throw error;
//   }
// }

// steps needed for user options
//make a golf corse select box. this will allow  you to select what course you want to use.
// It will also go through the api, make a current list, and select that list and data.

function fetchCurrentGolfCourseURL() {
  //currentGolfCourseId is the slectedCourses id value wich is only 5 digits. input htis into the url to get complete access to the golf courses data.
  let currentGolfCourseId = selectedCourse.value;
  let currentGolfCourseURL = `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${currentGolfCourseId}.json`;
  if (currentGolfCourseURL) {
    fetchCurrentGolfCourse(currentGolfCourseURL);
  }
}

async function fetchCurrentGolfCourse(url) {
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error("network response was not ok");
    }
    currentGolfCourse = await response.json();
    let teeBoxSelectHtml = "";
    let totalYards = {};
    currentGolfCourse.holes.forEach((hole) => {
      hole.teeBoxes.forEach(function (teeBox) {
        if (totalYards[teeBox.teeType] === undefined) {
          totalYards[teeBox.teeType] = teeBox.yards;
        } else {
          totalYards[teeBox.teeType] += teeBox.yards;
        }
      });
    });
    for (let property in totalYards) {
      if (totalYards.hasOwnProperty(property)) {
        const yards = totalYards[property];
        teeBoxSelectHtml += `<option value="${property}">${property.toUpperCase()}, ${yards} yards</option>`;
      
      }
    }
    document.getElementById("selectedTeeBox").innerHTML = teeBoxSelectHtml;
  } catch (error) {
    // console.error("Error:", error);
  }

  
}
async function fetchData() {
  try {
    // getting all courses with the api
    const courses = await getCourses();
    // getting thanksgiving points course data running the get courses details funciton.

    let courseOptionHTML = "";
    courses.forEach((course) => {
      courseOptionHTML += `<option value="${course.id}">${course.name}</option>`;
    });
    document.getElementById("selectedCourse").innerHTML = courseOptionHTML;
  } catch (error) {
    // Handle any errors here
    console.error(
      "fetchingCourses data did not happenin resulting in error:",
      error
    );
  }
  fetchCurrentGolfCourseURL();
}

function print(currentGolfCourse, currentTeeType) {
  // print logic heref
  let currHoles = currentGolfCourse.holes;
  let currYards = []
  console.log(currentTeeType)
  currHoles.forEach(elem => {
    let currBox = elem.teeBoxes
    let box = currBox.find((Object) => Object.teeType === currentTeeType)
    currYards.push(box.yards);
  })
  console.log(currYards)
  let golfChart = 
    '<table class="table table-bordered">'+
      '<tr class="col-10">'+
        '<th>hole</th>'+
        '<th>1</th>'+
        '<th>2</th>'+
        '<th>3</th>'+
        '<th>4</th>'+
        '<th>5</th>'+
        '<th>6</th>'+
        '<th>7</th>'+
        '<th>8</th>'+
        '<th>9</th>'+
        '<th>out</th>'+
      '</tr>'+
    '<tr class="col-10">';
  
  currYards.forEach(yard => {
    golfChart += `<th class="">${yard}</th>`;
  })
  golfChart += '</tr>';
  golfChart += '</table>';

  document.getElementById('tableCon').innerHTML = golfChart
console.log(currentTeeType, currentGolfCourse)
}
console.log(currentTeeType)
function printTable() {}

// run funciton on change or window load. put this into a window load function if we do local storage
fetchData();
document.getElementById("selectedCourse").addEventListener('change', () => {
    fetchCurrentGolfCourseURL();
});
document.getElementById("selectedTeeBox").addEventListener('change', () => {
  selectedHtmlTeeBox = document.getElementById('selectedTeeBox')
    currentTeeType = selectedHtmlTeeBox.value;
    print(currentGolfCourse, currentTeeType);
});

// make a bootsraps responsive table with different labels. hole yardage par handicap. also have rows for players.
// input current feild, with data sets in the print function

// create objects with classes for each player. this will allow you to keep each individual score

// make a print function that will add up the scores and display the sum. there are 18 holes so an index of 0-17.

// use toasts to display when the user has finished a game.
