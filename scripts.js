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
const trump = document.querySelector('.trump .votes');
const biden = document.querySelector('.biden .votes');
const bidenPercentage = document.querySelector('.bar-biden');
const trumpPercentage = document.querySelector('.bar-trump');
const trumpTable = document.querySelector('.table-trump');
const bidenTable = document.querySelector('.table-biden');
const trumpTableButton = document.querySelector('.trump .show-table-btn');
const bidenTableButton = document.querySelector('.biden .show-table-btn');
const winner = document.querySelector('.winner');
const presidentElect = document.querySelector('.winner-president');
const winnerCloseBtn = document.querySelector('.close-winner-btn');
let winnerAnnounced = false;

let trumpVotes = [];
let bidenVotes = [];

/* 
Change votes to Trump or to Biden. 
First click goes to Trump, second changes to Biden, third goes back to neutral.
Add votes to their respective arrays.
Remove votes from their respective arrays.
Sort arrays.
Update vote totals at the end.
*/
function claimState(e) {
   e.preventDefault();
   switch (e.currentTarget.dataset.candidate) {
      case '' :
         e.currentTarget.dataset.candidate = 'trump';
         let trumpObject = {
            state: e.currentTarget.dataset.state,
            votes: Number.parseInt(e.currentTarget.dataset.electorate)
         };
         // Add to object array
         trumpVotes.push(trumpObject);
         break;
      case 'trump' :
         e.currentTarget.dataset.candidate = 'biden';
         let bidenObject = {
            state: e.currentTarget.dataset.state,
            votes: Number.parseInt(e.currentTarget.dataset.electorate)
         };
         // Add to object array
         bidenVotes.push(bidenObject);
         // remove from Trump
         removeVotes(e.currentTarget.dataset.state, trumpVotes);
         break;
      case 'biden' :
         e.currentTarget.dataset.candidate = '';
         // remove from Biden
         removeVotes(e.currentTarget.dataset.state, bidenVotes);
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
   let trumpTotal = 0;
   let trumpAllStates = '';
   sortCandidateArray(trumpVotes);
   for(let t = 0; t < trumpVotes.length; t++) {
      trumpTotal += trumpVotes[t].votes;
      trumpAllStates += `<div class="table-row"><div>${trumpVotes[t].state}</div><div>${trumpVotes[t].votes}</div></div>`;
   }

   // Update the HTML with the states and percentage to 270
   trump.textContent = `${trumpTotal} Votes`;
   trumpPercentage.style.width = `${trumpTotal / 270 * 100}%`;
   trumpTable.innerHTML = trumpAllStates;
 
   let bidenTotal = 0;
   let bidenAllStates = '';
   sortCandidateArray(bidenVotes);
   for(let b = 0; b < bidenVotes.length; b++) {
      bidenTotal += bidenVotes[b].votes;
      bidenAllStates += `<div class="table-row"><div>${bidenVotes[b].state}</div><div>${bidenVotes[b].votes}</div></div>`;
   }

   // Update the HTML with the states and percentage to 270
   biden.textContent = `${bidenTotal} Votes`;
   bidenPercentage.style.width = `${bidenTotal / 270 * 100}%`;
   bidenTable.innerHTML = bidenAllStates;

   // display winner dialog once either candidate reaches 270
   if (trumpTotal >= 270 || bidenTotal >= 270) {
      if (trumpTotal >= 270) {
         presidentElect.textContent = `Donald Trump - ${trumpTotal} Votes`;
         h1.textContent = 'President-Elect Donald Trump';
      } else {
         presidentElect.textContent = `🌈 Joe Biden 💕 - ${bidenTotal} Votes`;
         h1.textContent = 'President-Elect Joe Biden';
      }
      if (winnerAnnounced === false ) {
         winner.classList.add('open');
         instructionsOverlay.classList.add('open');
         // Only show winner pop-up once
         winnerAnnounced = true;
      }
   }
}

/* check electoral vote total in SVG map to make sure states are accurate (run once) */
function checkElectoral() {
   let total = 0;
   for(let i = 0; i < states.length; i++) {
      total += Number.parseInt(states[i].dataset.electorate);
   }
   console.log(total);
}

/* Show the current state and electoral count on single click */
function handleStateInfo(e) {
   e.preventDefault();
   const stateName = e.currentTarget.dataset.state;
   const stateElectorates = e.currentTarget.dataset.electorate;
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

/* Collapse tables showing states for Trump */
function handleTrumpTable(e) {
   if (trumpTable.getAttribute('aria-expanded') === 'true') {
      trumpTable.setAttribute('aria-expanded', 'false');
      e.currentTarget.setAttribute('aria-expanded', 'false');
   } else {
      trumpTable.setAttribute('aria-expanded', 'true');
      e.currentTarget.setAttribute('aria-expanded', 'true');
   }
}

/* Collapse tables showing states for Biden */
function handleBidenTable(e) {
   if (bidenTable.getAttribute('aria-expanded') === 'true') {
      bidenTable.setAttribute('aria-expanded', 'false');
      e.currentTarget.setAttribute('aria-expanded', 'false');
   } else {
      bidenTable.setAttribute('aria-expanded', 'true');
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
trumpTableButton.addEventListener('click', handleTrumpTable);
bidenTableButton.addEventListener('click', handleBidenTable);

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