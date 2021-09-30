/*
* Create a new variable called pokemonList
* and assign to it a blank array.
*/



//Add several objects to the array

let lunala = {
    name: 'Lunala',
    height: 13,
    type: ['psychich', 'ghost']
  };

let solgaleo = {
    name: 'Solgaleo',
    height: 11,
    type: ['psyhich', 'steel']
  };

let psyduck = {
    name: 'Psyduck',
    height: 2,
    type: 'water'
  };

let yveltal = {
    name: 'Yveltal',
    height: 19,
    type: ['dark', 'flying']
  };

let pilowswine = {
    name: 'Pilowswine',
    height: 3,
    type: ['ice', 'ground']
  };

let unown = {
    name: 'Unown',
    height: 1,
    type: 'psychich'
  };

let magnemite = {
    name: 'Magnemite',
    height: 1,
    type: ['electric', 'steel']
  };

//Assigning of named objects to the blank pokemonList array

let pokemonList = ['lunala', 'solgaleo', 'psyduck', 'yveltal', 'pilowswine', 'unown', 'magnemite'];
let text = '';
let i = 0

//Here comes the 'for loop'

for (;pokemonList [i];){
  text = text + ' ' + pokemonList [i];
  i++;
}
document.write(text);
