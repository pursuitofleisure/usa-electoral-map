const states = document.querySelectorAll('.state');
const current = document.querySelector('.current-state');
const trump = document.querySelector('.trump .votes');
const biden = document.querySelector('.biden .votes');
const bidenPercentage = document.querySelector('.bar-biden');
const trumpPercentage = document.querySelector('.bar-trump');
let trumpVotes = [];
let bidenVotes = [];

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
   switch (this.dataset.candidate) {
      case '' :
         this.dataset.candidate = 'trump';
         //this.querySelector('path').style.fill = 'red';
         let trumpArray = {
            state: this.dataset.state,
            votes: Number.parseInt(this.dataset.electorate)
         };
         trumpVotes.push(trumpArray);
         //console.log(trumpVotes);
         break;
      case 'trump' :
         this.dataset.candidate = 'biden';
         //this.querySelector('path').style.fill = 'blue';
         let bidenArray = {
            state: this.dataset.state,
            votes: Number.parseInt(this.dataset.electorate)
         };
         bidenVotes.push(bidenArray);
         removeVotes(this.dataset.state, trumpVotes);
         // console.log(trumpVotes);
         break;
      case 'biden' :
         this.dataset.candidate = '';
         //this.querySelector('path').style.fill = 'mistyrose';
         removeVotes(this.dataset.state, bidenVotes);
         break;
      default:
         this.dataset.candidate = '';
         break;
   }
   updateVoteTotals();

}

/* Remove votes from candidate when the state color changes */
function removeVotes(state, arrayToChange) {
   // first find the index of the item in the array
   const stateIndex = arrayToChange.findIndex(usa => usa.state === state);
   //console.log(stateIndex);
   // Modify the original array
   arrayToChange.splice(stateIndex, 1);
}

/* Update Candidate Votes upon each state double-click */
function updateVoteTotals() {
   let trumpTotal = 0;
   for(let t = 0; t < trumpVotes.length; t++) {
      trumpTotal += trumpVotes[t].votes;
   }
   //console.log('Trump total: ' + trumpTotal);
   trump.textContent = `${trumpTotal} Votes`;
   trumpPercentage.style.width = `${trumpTotal / 270 * 100}%`;

   let bidenTotal = 0;
   for(let b = 0; b < bidenVotes.length; b++) {
      bidenTotal += bidenVotes[b].votes;
   }
   //console.log('Biden total: ' + bidenTotal);
   biden.textContent = `${bidenTotal} Votes`;
   bidenPercentage.style.width = `${bidenTotal / 270 * 100}%`;
   //console.log(bidenTotal / 270 * 100);
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
   const stateName = this.dataset.state;
   const stateElectorates = this.dataset.electorate;
   current.textContent = `${stateName}: ${stateElectorates} votes`;
}

// Listen for state clicks to change colors and votes
for (let i = 0; i < states.length; i++) {
   states[i].addEventListener('dblclick', claimState);
   states[i].addEventListener('click', handleStateInfo);
}