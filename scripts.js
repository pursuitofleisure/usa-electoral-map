const states = document.querySelectorAll('.state');
const current = document.querySelector('.current-state');
const trump = document.querySelector('.trump .votes');
const biden = document.querySelector('.biden .votes');
const bidenPercentage = document.querySelector('.bar-biden');
const trumpPercentage = document.querySelector('.bar-trump');
const trumpTable = document.querySelector('.table-trump');
const bidenTable = document.querySelector('.table-biden');
const trumpTableButton = document.querySelector('.trump .show-table-btn');
const bidenTableButton = document.querySelector('.biden .show-table-btn');
let trumpVotes = [];
let bidenVotes = [];

//const closeButton = document.querySelector('.close-instructions');
const instructions = document.querySelector('.instructions');

/* 
Change votes to Trump or to Biden. 
First double-click goes to Trump, second changes to Biden, third goes back to neutral.
Add votes to their respective arrays.
Remove votes from their respective arrays.
Update vote totals at the end.
*/
function claimState(e) {
   // console.log(this.dataset.electorate);
   e.preventDefault();
   switch (e.currentTarget.dataset.candidate) {
      case '' :
         e.currentTarget.dataset.candidate = 'trump';
         let trumpArray = {
            state: e.currentTarget.dataset.state,
            votes: Number.parseInt(e.currentTarget.dataset.electorate)
         };
         // Add to object array
         trumpVotes.push(trumpArray);
         break;
      case 'trump' :
         e.currentTarget.dataset.candidate = 'biden';
         let bidenArray = {
            state: e.currentTarget.dataset.state,
            votes: Number.parseInt(e.currentTarget.dataset.electorate)
         };
         // Add to object array
         bidenVotes.push(bidenArray);
         // remove from Trump
         removeVotes(e.currentTarget.dataset.state, trumpVotes);
         break;
      case 'biden' :
         e.currentTarget.dataset.candidate = '';
         // remove from Biden
         removeVotes(e.currentTarget.dataset.state, bidenVotes);
         break;
      default:
         e.currentTarget.dataset.candidate = '';
         break;
   }
   // Sort vote objects
   trumpVotes.sort(function(a, b) {
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

   bidenVotes.sort(function(a, b) {
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

   updateVoteTotals();

}

/* Remove votes from candidate when the state color changes */
function removeVotes(state, arrayToChange) {
   // first find the index of the item in the array
   const stateIndex = arrayToChange.findIndex(usa => usa.state === state);
   // Modify the original array
   arrayToChange.splice(stateIndex, 1);
}

/* Update Candidate Votes upon each state double-click */
function updateVoteTotals() {
   let trumpTotal = 0;
   let trumpAllStates = '';
   for(let t = 0; t < trumpVotes.length; t++) {
      trumpTotal += trumpVotes[t].votes;
      trumpAllStates += `<div class="table-row"><div>${trumpVotes[t].state}</div><div>${trumpVotes[t].votes}</div></div>`;
   }

   trump.textContent = `${trumpTotal} Votes`;
   trumpPercentage.style.width = `${trumpTotal / 270 * 100}%`;
   trumpTable.innerHTML = trumpAllStates;
 
   let bidenTotal = 0;
   let bidenAllStates = '';
   for(let b = 0; b < bidenVotes.length; b++) {
      bidenTotal += bidenVotes[b].votes;
      bidenAllStates += `<div class="table-row"><div>${bidenVotes[b].state}</div><div>${bidenVotes[b].votes}</div></div>`;
   }

   biden.textContent = `${bidenTotal} Votes`;
   bidenPercentage.style.width = `${bidenTotal / 270 * 100}%`;
   bidenTable.innerHTML = bidenAllStates;
}

/* check electoral vote total to make sure states are accurate (run once) */
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

/* Close Instructions */
function handleClosebutton() {
   instructions.classList.add('closed');
   instructions.classList.remove('open');
}

/* Collapse tables showing states */
function handleTrumpTable(e) {
   if (trumpTable.getAttribute('aria-expanded') === 'true') {
      trumpTable.setAttribute('aria-expanded', 'false');
      e.currentTarget.setAttribute('aria-expanded', 'false');
   } else {
      trumpTable.setAttribute('aria-expanded', 'true');
      e.currentTarget.setAttribute('aria-expanded', 'true');
   }
}

function handleBidenTable(e) {
   if (bidenTable.getAttribute('aria-expanded') === 'true') {
      bidenTable.setAttribute('aria-expanded', 'false');
      e.currentTarget.setAttribute('aria-expanded', 'false');
   } else {
      bidenTable.setAttribute('aria-expanded', 'true');
      e.currentTarget.setAttribute('aria-expanded', 'true');
   }
}

// Listen for button clicks to collapse / expand states table
trumpTableButton.addEventListener('click', handleTrumpTable);
bidenTableButton.addEventListener('click', handleBidenTable);

// Listen for state clicks to change colors and votes
for (let i = 0; i < states.length; i++) {
   states[i].addEventListener('dblclick', claimState);
   states[i].addEventListener('click', handleStateInfo);
}

//closeButton.addEventListener('click', handleClosebutton);
