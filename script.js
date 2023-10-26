//setting current TeeType default
let currentTeeType;
let currentGolfCourse;
let pageNum = 1;
let listOfPlayers = [];
let totalsArray = [];
if (currentGolfCourse === undefined) {
  currentGolfCourse = fetchCurrentGolfCourse(
    "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course11819.json"
  );
}
if (currentTeeType === undefined && currentGolfCourse) {
  defaultTeeType();
}
async function defaultTeeType() {
  await currentGolfCourse;
  // Initialize the defaultTeeType to a default value
  // Loop through the holes in the currentGolfCourse
  currentGolfCourse.holes.forEach((hole) => {
    // Check if the teeBoxes array is not empty
    if (hole.teeBoxes.length > 0) {
      // Get the first tee box (teeType) for the current hole
      const firstTeeBox = hole.teeBoxes[0];

      // Set the defaultTeeType to the teeType of the first tee box
      currentTeeType = firstTeeBox.teeType;

      // You can break out of the loop if you want to stop after finding the first tee type
      return;
    }
  });

  // Return the defaultTeeType
  print(currentGolfCourse, currentTeeType);
  return currentTeeType;
  
}

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

function fetchCurrentGolfCourseURL() {
  //currentGolfCourseId is the slectedCourses id value wich is only 5 digits. input htis into the url to get complete access to the golf courses data.
  let currentGolfCourseId = selectedCourse.value;
  let currentGolfCourseURL = `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${currentGolfCourseId}.json`;
  if (currentGolfCourseURL) {
    fetchCurrentGolfCourse(currentGolfCourseURL);
  }
  return currentGolfCourseURL;
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
    return currentGolfCourse;
  } catch (error) {
    console.error("Error:", error);
    throw error;
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

/// switch page function
const tableCon = document.getElementById('tableCon')
document.getElementById("rightArrow").addEventListener("click", () => {
  if (pageNum === 1) {
    pageNum = 2;
    tableCon.classList.add('animate__slideInRight')
    tableCon.classList.remove('animate__slideInLeft')
    document.getElementById("leftArrow").classList.remove("clickedArrow");
    document.getElementById("rightArrow").classList.add("clickedArrow");
    print(currentGolfCourse, currentTeeType);
  }
});
document.getElementById("leftArrow").addEventListener("click", () => {
  if (pageNum === 2) {
    pageNum = 1;
    tableCon.classList.remove('animate__slideInRight')
    tableCon.classList.add('animate__slideInLeft')
    document.getElementById("rightArrow").classList.remove("clickedArrow");
    document.getElementById("leftArrow").classList.add("clickedArrow");
    print(currentGolfCourse, currentTeeType);
  }
});

// player class

class Player {
  constructor(name, id = listOfPlayers.length + 1, scores, playerTotal) {
    scores = Array(18).fill(0);
    this.name = name;
     this.id = id;
    this.scores = scores;
    playerTotal = 0;
  }
  printingPlayer() {
    let playerRow = `<tr class="col-10"><td>${this.name}</td>`;
    for (let i = 0; i < 10; i++) {
      playerRow += `<td></td>`;
    }
  }
}
function newPlayer() {
  let name = document.getElementById("newPlayerInput").value;
  //make a regex or a filter to find any name exactly equal to name and if so alert. if not run function.

  // if(){
  // alert('cant have same name')
  // }
  if (listOfPlayers.length > 3) {
    toastr["error"]("Maximum Players", "Max")
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
  } else {
    const newPlayer = new Player(`${name}`, listOfPlayers.length + 1);
    listOfPlayers.push(newPlayer);
  }
}
function inputEnter(event) {
  if (event.keyCode === 13) {
    if (event.target === document.getElementById("newPlayerInput")) {
      newPlayer();
      clear();
      print(currentGolfCourse, currentTeeType);
    }
  }
}
function checkIfHolesAreCompleted() {
  const playerRows = document.querySelectorAll('.playerDomRow');
  let completedAllHoles = true; // Initialize as true

  for (let i = 0; i < playerRows.length; i++) {
    const cells = playerRows[i].querySelectorAll('td'); // Assuming you want to check td elements

    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      if (cell.textContent.trim() === '') {
        completedAllHoles = false; // If any cell is empty, set it to false
        break; // No need to check the rest, we already found an empty cell
      }
    }

    if (!completedAllHoles) {
      break; // No need to check the rest of the rows, we already found an empty cell
    }
  }

  if (completedAllHoles && pageNum === 2 ) {
    listOfPlayers.forEach((player) => {
      totalsArray += player.playerTotal;
    })
    const bestScore = Math.min(totalsArray);
    let bestPlayer = '';
    listOfPlayers.forEach((player) => {
      if(player.playerTotal === bestScore){
         bestPlayer = capitalizeFirstName(player.name);
      }
    })
    playerSuccess(bestPlayer, bestScore);
  }
}
function playerSuccess(bestPlayer, bestScore){
   toastr.success(`${bestPlayer}, YOU ARE THE WINNER WITH A SCORE OF ${bestScore}!`);
  resetButton();
  }
/// print function

function print(currentGolfCourse, currentTeeType) {
  let currHoles = currentGolfCourse.holes;
  let currYards = [];
  let outYards = 0;
  let totalYards = 0;
  let currPar = [];
  let outPar = 0;
  let totalPar = 0;
  let currHcp = [];

  /// getting the right tbox

  currHoles.forEach((elem) => {
    let box = elem.teeBoxes.find((Object) => Object.teeType === currentTeeType);
    currYards.push(box.yards);
    totalYards += box.yards;
    currPar.push(box.par);
    totalPar += box.par;
    currHcp.push(box.hcp);
  });

  if (pageNum === 1) {
    currYards.splice(-9);
    currPar.splice(-9);
    currHcp.splice(-9);
  } else if (pageNum === 2) {
    currYards.splice(0, 9);
    currPar.splice(0, 9);
    currHcp.splice(0, 9);
  }

  /// printing holes

  let golfChart = '<tr class="col-10"><td>Hole</td>';
  if (pageNum === 1) {
    for (let i = 1; i < 10; i++) {
      golfChart += `<td>${i}</td>`;
    }
  } else if (pageNum === 2) {
    for (let i = 10; i < 19; i++) {
      golfChart += `<td>${i}</td>`;
    }
  }
  if (pageNum === 1) {
    golfChart += "<td>out</td> </tr>";
  } else {
    golfChart += "<td>total</td> </tr>";
  }

  /// printing yards

  golfChart += '<tr class="col-10"><td>Yard</td>';
  currYards.forEach((yard) => {
    golfChart += `<td>${yard}</td>`;
    outYards += yard;
  });
  if (pageNum === 1) {
    golfChart += `<td>${outYards}</td></tr>`;
  } else {
    golfChart += `<td>${totalYards}</td></tr>`;
  }

  /// print par

  golfChart += '<tr class="col-10"><td>Par</td>';
  currPar.forEach((par) => {
    golfChart += `<td>${par}</td>`;
    outPar += par;
  });
  if (pageNum === 1) {
    golfChart += `<td>${outPar}</td></tr>`;
  } else {
    golfChart += `<td>${totalPar}</td></tr>`;
  }

  /// print hcp

  golfChart += '<tr class="col-10"><td>Hcp</td>';
  currHcp.forEach((hcp) => {
    golfChart += `<td>${hcp}</td>`;
  });
  golfChart += `<td>N/A</td></tr>`;

  /// print players

  listOfPlayers.forEach((player) => {
    golfChart += `<tr class="col-10 playerDomRow">
      <td class="editable-cell">
        <span id="name-${player.id}" class="editable-name" onclick="showDropdown(this)">${capitalizeFirstName(player.name)}</span>
        <div class="dropdown-content">
          <a href="javascript:void(0)" id="edit-${player.id}" onclick="editPlayerName(this.id)">Edit</a>
          <a href="javascript:void(0)" onclick="removeName(this)">Remove</a>
        </div>
      </td>`;
    if (pageNum === 1) {
      let count = 1;
      let outScore = 0;
      let newPlayerScore = player.scores.slice(0,-9);
      newPlayerScore.forEach(score => {
        outScore += score;
        if(score === 0) {
          golfChart += `<td><input type="text" class="scoreIn" id="${player.id}-${count}"></td>`
        }
        if(score !== 0) {
          golfChart += `<td>${score}</td>`
        }
        count += 1;
      })
      golfChart += `<td>${outScore}</td></tr>`;
    }
    if (pageNum === 2) {
      let count = 10;
      let totalScore = 0;
      player.scores.forEach(elem => {
        totalScore += elem
      });
      player.playerTotal = totalScore
      let newPlayerScore = player.scores.slice(9);
      newPlayerScore.forEach(score => {
        if(score === 0) {
          golfChart += `<td><input type="text" class="scoreIn" id="${player.id}-${count}"></td>`
        }
        if(score !== 0) {
          golfChart += `<td>${score}</td>`
        }
        count += 1;
      })
      golfChart += `<td>${totalScore}</td></tr>`;
    }
  });

  /// adding it all to the dom

  document.getElementById("mainTable").innerHTML = golfChart;
  console.log(
    `currentTeeType: ${currentTeeType}`,
    `currentGolfCourse: ${currentGolfCourse.city}`
  );
  scoreInput();
  if(listOfPlayers.length > 0){
  checkIfHolesAreCompleted()
}
}

/// input scores

function scoreInput() {
  listOfPlayers.forEach(player => {
    let playerIn = document.querySelectorAll(`[id^="${player.id}"]`);
    playerIn.forEach(elem => {
      elem.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === 'Tab') {
          if (elem.value > 0) {
            let input = Number(elem.value);
            let inputNum;
            if (elem.id.length === 3) {
              inputNum = Number(elem.id.slice(-1)) - 1;
            } else {
              inputNum = Number(elem.id.slice(-2)) - 1;
            }
            player.scores.splice(inputNum, 1, input);
            // elem.replaceWith(input)
            print(currentGolfCourse, currentTeeType);
          } else {
            toastr["error"]("Not a valid golf score", "Error");
            toastr.options = {
              "closeButton": false,
              "debug": false,
              "newestOnTop": false,
              "progressBar": true,
              "positionClass": "toast-top-center",
              "preventDuplicates": false,
              "onclick": null,
              "showDuration": "300",
              "hideDuration": "1000",
              "timeOut": "5000",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            };
            // Clear input if incorrect
            elem.value = '';
          }
        }
      });
    });
  });
}
// run funciton on change or window load. put this into a window load function if we do local storage

fetchData();
document
  .getElementById("selectedCourse")
  .addEventListener("change", async () => {
    try {
      let url = fetchCurrentGolfCourseURL();
      await fetchCurrentGolfCourse(url);
      defaultTeeType();
      print(currentGolfCourse, currentTeeType);
    } catch {
      console.error("Error:", error);
    }
  });
document.getElementById("selectedTeeBox").addEventListener("change", () => {
  selectedHtmlTeeBox = document.getElementById("selectedTeeBox");
  currentTeeType = selectedHtmlTeeBox.value;
  print(currentGolfCourse, currentTeeType);
});

function clear() {
  document.getElementById("newPlayerInput").value = "";
}
function resetButton(){
 const htmlResetButton= '<div class="btn btn-danger w-25 h-100 fw-bold" onClick="reset()">Reset</div>'
  document.getElementById('resetButtonHtml').innerHTML = htmlResetButton;
}
function reset(){
  window.location.reload();
  
// currentTeeType;
//  currentGolfCourse;
//  pageNum = 1;
//  listOfPlayers = [];
//  document.getElementById('resetButtonHtml').innerHTML = '';
}

//drop down name editing
function showDropdown(span) {
  const dropdown = span.nextElementSibling;
  dropdown.style.display = "block";
}

function editPlayerName(editId) {
  const playerId = editId.replace(/[^0-9]/g, '');
  listOfPlayers.forEach((player) => {
   if(player.id == playerId){
    const newName = prompt(`Enter a new name for ${player.name}:`);
   if (newName !== null) {
     player.name = capitalizeFirstName(newName);
     const playerElement = document.getElementById(`name-${player.id}`);
     if (playerElement) {
       playerElement.textContent = newName;
     }
   }
   }
  }) 
};
function removeName(link) {
  const confirmation = confirm("Are you sure you want to remove this name?");
  if (confirmation) {
    const span = link.parentNode.parentNode.firstChild.nextElementSibling;
    const spanId = span.id;
    const playerId = spanId.replace(/[^0-9]/g, '');
    const playerNumIndex  = (parseInt(playerId)-1);
    listOfPlayers.splice(playerNumIndex, 1);
    const cell = link.parentNode.parentNode.parentNode;
    cell.parentNode.removeChild(cell);
  }
   
}
//just for fun capatilizing first names
function capitalizeFirstName(name) {
  // Check if the name is empty or consists of only spaces
  if (name.trim() === "") {
    return name;
  }

  // Capitalize the first character and concatenate with the rest of the string
  return name.charAt(0).toUpperCase() + name.slice(1);
}
