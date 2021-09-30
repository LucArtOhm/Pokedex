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

//Here comes the 'for loop'

let pokemonList = ['lunala (height: 13)', 'solgaleo (height: 11)', 'psyduck (height: 2)', 'yveltal (height: 19)', 'pilowswine (height: 3)', 'unown (height: 1)', 'magnemite (height: 1)'];
let text = '';
let i = 0

for (;pokemonList [i];){
  text = text + ' ' + pokemonList [i];
  i++;
}
document.write(text);
