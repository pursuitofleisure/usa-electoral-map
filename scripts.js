/* Electoral values */
const electoralValues = [
   { state: 'Alabama', allocation: 9 },
   { state: 'Alaska', allocation: 3 },
   { state: 'Arizona', allocation: 11 },
   { state: 'Arkansas', allocation: 6 },
   { state: 'California', allocation: 54 },
   { state: 'Colorado', allocation: 10 },
   { state: 'Connecticut', allocation: 7 },
   { state: 'Delaware', allocation: 3 },
   { state: 'District of Columbia', allocation: 3 },
   { state: 'Florida', allocation: 30 },
   { state: 'Georgia', allocation: 16 },
   { state: 'Hawaii', allocation: 4 },
   { state: 'Idaho', allocation: 4 },
   { state: 'Illinois', allocation: 19 },
   { state: 'Indiana', allocation: 11 },
   { state: 'Iowa', allocation: 6 },
   { state: 'Kansas', allocation: 6 },
   { state: 'Kentucky', allocation: 8 },
   { state: 'Louisiana', allocation: 8 },
   { state: 'Maine', allocation: 4 },
   { state: 'Maine - Popular', allocation: 2 },
   { state: 'Maine - District 1', allocation: 1 },
   { state: 'Maine - District 2', allocation: 1 },
   { state: 'Maryland', allocation: 10 },
   { state: 'Massachusetts', allocation: 11 },
   { state: 'Michigan', allocation: 15 },
   { state: 'Minnesota', allocation: 10 },
   { state: 'Mississippi', allocation: 6 },
   { state: 'Missouri', allocation: 10 },
   { state: 'Montana', allocation: 4 },
   { state: 'Nebraska', allocation: 5 },
   { state: 'Nebraska - Popular', allocation: 2 },
   { state: 'Nebraska - District 1', allocation: 1 },
   { state: 'Nebraska - District 2', allocation: 1 },
   { state: 'Nebraska - District 3', allocation: 1 },
   { state: 'Nevada', allocation: 6 },
   { state: 'New Hampshire', allocation: 4 },
   { state: 'New Jersey', allocation: 14 },
   { state: 'New Mexico', allocation: 5 },
   { state: 'New York', allocation: 28 },
   { state: 'North Carolina', allocation: 16 },
   { state: 'North Dakota', allocation: 3 },
   { state: 'Ohio', allocation: 17 },
   { state: 'Oklahoma', allocation: 7 },
   { state: 'Oregon', allocation: 8 },
   { state: 'Pennsylvania', allocation: 19 },
   { state: 'Rhode Island', allocation: 4 },
   { state: 'South Carolina', allocation: 9 },
   { state: 'South Dakota', allocation: 3 },
   { state: 'Tennessee', allocation: 11 },
   { state: 'Texas', allocation: 40 },
   { state: 'Utah', allocation: 6 },
   { state: 'Vermont', allocation: 3 },
   { state: 'Virginia', allocation: 13 },
   { state: 'Washington', allocation: 12 },
   { state: 'West Virginia', allocation: 4 },
   { state: 'Wisconsin', allocation: 10 },
   { state: 'Wyoming', allocation: 3 },
];

/* States */
const states = document.querySelectorAll('.state');//svg map states
const maineState = document.querySelector('.state[data-state="Maine"]');
const nebraskaState = document.querySelector('.state[data-state="Nebraska"]');
const squareStates = document.querySelectorAll('.square-state');//states unable to click from map
const current = document.querySelector('.current-state');
const closeExceptions = document.querySelectorAll('.close-state-btn');
const h1 = document.querySelector('h1 span');

/* Instructions */
const closeButton = document.querySelector('.close-instructions-btn');
const openButton = document.querySelector('.open-instructions-btn');
const instructions = document.querySelector('.instructions');
const instructionsOverlay = document.querySelector('.instructions-overlay');

/* Candidate votes and progress */
const gop = document.querySelector('.gop-votes');
const dem = document.querySelector('.dem-votes');
const demPercentage = document.querySelector('.bar-dem');
const gopPercentage = document.querySelector('.bar-gop');
const gopTable = document.querySelector('.table-gop');
const demTable = document.querySelector('.table-dem');
const gopTableButton = document.querySelector('.gop .show-table-btn');
const demTableButton = document.querySelector('.dem .show-table-btn');
const electGop = document.querySelector('.elect-gop');
const electDem = document.querySelector('.elect-dem');

/* Winner */
const winner = document.querySelector('.winner');
const presidentElect = document.querySelector('.winner-president');
const winnerCloseBtn = document.querySelector('.close-winner-btn');
let winnerAnnounced = false;

let gopVotes = [];
let demVotes = [];

/* Input candidate names */
const gopCandidate = 'Donald Trump';
const demCandidate = 'Joe Biden';
const gopTableHeading = 'Trump';
const demTableHeading = 'Biden';

/* Change Table Headings */
electGop.innerText = gopTableHeading;
electDem.innerText = demTableHeading;

/* 
Change votes to GOP or to Democrat. 
First click goes to GOP, second changes to Democrat, third goes back to neutral.
Add votes to their respective arrays.
Remove votes from their respective arrays.
Sort arrays.
Update vote totals at the end.
*/
function claimState(e) {
   e.preventDefault();

   switch (e.currentTarget.dataset.candidate) {
      case '' :
         e.currentTarget.dataset.candidate = 'gop';
         let gopObject = {
            state: e.currentTarget.dataset.state,
            votes: electoralValues.find(item => item.state === e.currentTarget.dataset.state).allocation
         };
         // Add to object array
         gopVotes.push(gopObject);
         break;
      case 'gop' :
         e.currentTarget.dataset.candidate = 'dem';
         let demObject = {
            state: e.currentTarget.dataset.state,
            votes: electoralValues.find(item => item.state === e.currentTarget.dataset.state).allocation
         };
         // Add to object array
         demVotes.push(demObject);
         // remove from GOP
         removeVotes(e.currentTarget.dataset.state, gopVotes);
         break;
      case 'dem' :
         e.currentTarget.dataset.candidate = '';
         // remove from Democrat
         removeVotes(e.currentTarget.dataset.state, demVotes);
         break;
      case 'exception' :
         break;
      default:
         e.currentTarget.dataset.candidate = '';
         break;
   }
   updateVoteTotals();

}

// sort arrays for each candidate alphabetically by state
function sortCandidateArray(candidateArray) {
   candidateArray.sort(function(a, b) {
      let stateA = a.state.toLowerCase();
      let stateB = b.state.toLowerCase();
      if (stateA < stateB) {
         return -1;
      }
      if (stateA > stateB) {
         return 1;
      }
      return 0;
   });
}

/* Remove votes from candidate when the state color changes */
function removeVotes(state, arrayToChange) {
   // first find the index of the item in the array
   const stateIndex = arrayToChange.findIndex(usa => usa.state === state);
   // Modify the original array
   if (stateIndex !== -1) {
      arrayToChange.splice(stateIndex, 1);
   }
}

/* Update Candidate Votes upon each state's assignment */
function updateVoteTotals() {
   let gopTotal = 0;
   let gopAllStates = '';
   sortCandidateArray(gopVotes);
   for(let t = 0; t < gopVotes.length; t++) {
      gopTotal += gopVotes[t].votes;
      gopAllStates += `<div class="table-row"><div>${gopVotes[t].state}</div><div>${gopVotes[t].votes}</div></div>`;
   }

   // Update the HTML with the states and percentage to 270
   gop.textContent = `${gopTotal} Votes`;
   gopPercentage.style.width = `${gopTotal / 270 * 100}%`;
   gopTable.innerHTML = gopAllStates;
 
   let demTotal = 0;
   let demAllStates = '';
   sortCandidateArray(demVotes);
   for(let b = 0; b < demVotes.length; b++) {
      demTotal += demVotes[b].votes;
      demAllStates += `<div class="table-row"><div>${demVotes[b].state}</div><div>${demVotes[b].votes}</div></div>`;
   }

   // Update the HTML with the states and percentage to 270
   dem.textContent = `${demTotal} Votes`;
   demPercentage.style.width = `${demTotal / 270 * 100}%`;
   demTable.innerHTML = demAllStates;

   // display winner dialog once either candidate reaches 270
   if (gopTotal >= 270 || demTotal >= 270) {
      if (gopTotal >= 270) {
         presidentElect.textContent = `${gopCandidate} - ${gopTotal} Votes`;
         h1.textContent = ` - President-Elect ${gopCandidate}`;
      } else {
         presidentElect.textContent = `${demCandidate} 🎆 - ${demTotal} Votes`;
         h1.textContent = ` - President-Elect ${demCandidate}`;
      }
      if (winnerAnnounced === false ) {
         winner.classList.add('open');
         instructionsOverlay.classList.add('open');
         // Only show winner pop-up once
         winnerAnnounced = true;
      }
   }
}

/* check electoral vote total (538) in SVG map to make sure states are accurate (run once) */
function checkElectoral() {
   let total = 0;
   let stateName = '';
   for(let i = 0; i < states.length; i++) {
      stateName = states[i].dataset.state;
      total += Number.parseInt(electoralValues.find(item => item.state === stateName).allocation);
   }
   console.log(total);
}

/* Show the current state and electoral count on single click */
function handleStateInfo(e) {
   e.preventDefault();
   const stateName = e.currentTarget.dataset.state;
   const stateElectorates = electoralValues.find(item => item.state === e.currentTarget.dataset.state).allocation;
   current.textContent = `${stateName}: ${stateElectorates} votes`;
}

/* Close Instructions and Close Winner */
function handleClosebutton() {
   instructions.classList.remove('open');
   instructions.classList.add('closed');
   instructionsOverlay.classList.remove('open');
   winner.classList.remove('open');
}

/* Open Instructions */
function handleOpenbutton() {
   instructions.classList.add('open');
   instructions.classList.remove('closed');
   instructionsOverlay.classList.add('open');
}

/* Collapse tables showing states for GOP Candidate */
function handleGopTable(e) {
   if (gopTable.getAttribute('aria-expanded') === 'true') {
      gopTable.setAttribute('aria-expanded', 'false');
      e.currentTarget.setAttribute('aria-expanded', 'false');
   } else {
      gopTable.setAttribute('aria-expanded', 'true');
      e.currentTarget.setAttribute('aria-expanded', 'true');
   }
}

/* Collapse tables showing states for Dem Candidate */
function handleDemTable(e) {
   if (demTable.getAttribute('aria-expanded') === 'true') {
      demTable.setAttribute('aria-expanded', 'false');
      e.currentTarget.setAttribute('aria-expanded', 'false');
   } else {
      demTable.setAttribute('aria-expanded', 'true');
      e.currentTarget.setAttribute('aria-expanded', 'true');
   }
}

/* Check if Maine or Nebraska is clicked to open the buttons */
maineState.addEventListener('click', function() {
   const maine = document.querySelector('.maine');
   maine.classList.add('active');
});

nebraskaState.addEventListener('click', function() {
   const nebraska = document.querySelector('.nebraska');
   nebraska.classList.add('active');
});

/* Listen for close button on Maine / Nebraska */
closeExceptions.forEach(exception => {
   exception.addEventListener('click', function(e) {
      const closestState = e.currentTarget.closest('.exception-state');
      closestState.classList.remove('active');
   });
});

/* Listen for button clicks to collapse / expand states table */
gopTableButton.addEventListener('click', handleGopTable);
demTableButton.addEventListener('click', handleDemTable);

/* Listen for state clicks to change colors and votes */
states.forEach(state => {
   state.addEventListener('click', claimState);
   state.addEventListener('mouseenter', handleStateInfo);
});

/* Listen for square states */
squareStates.forEach(state => {
   state.addEventListener('click', claimState);
});

/* Buttons for instructions */
closeButton.addEventListener('click', handleClosebutton);
openButton.addEventListener('click', handleOpenbutton);
instructionsOverlay.addEventListener('click', handleClosebutton);

/* Button for winner dialog */
winnerCloseBtn.addEventListener('click', handleClosebutton);
