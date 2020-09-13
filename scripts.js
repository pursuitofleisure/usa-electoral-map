const states = document.querySelectorAll('.state');
let trumpVotes = [];
let bidenVotes = [];

// Change votes to Trump or to Biden
// Add votes to their respective arrays
// Remove votes from their respective arrays
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
         // console.log(trumpVotes);
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

}

/* Remove votes from candidate when the state color changes */
function removeVotes(state, arrayToChange) {
   // first find the index of the item in the array
   const stateIndex = arrayToChange.findIndex(usa => usa.state === state);
   console.log(stateIndex);
   // make a new array without that item
   arrayToChange.splice(stateIndex, 1);
   // return new array
}

/* Update Candidate Votes */
function updateVoteTotals() {

}

// Listen for state clicks to change colors and votes
for (let i = 0; i < states.length; i++) {
   states[i].addEventListener('click', claimState);
}