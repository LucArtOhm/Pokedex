//1. Wrap PokemonList array in an IIFE to avoid accidentally accessing the global state.
//2. Create new pokemonRepository variable to hold what your IIFE will return, then assign the IIFE to that variable.

let pokemonRepository = (function(){
  let pokemonList = [
    {
      name: 'Lunala',
      height: 13,
      type: ['psychich', ' ghost'],
      weakness: ['ghost', ' dark']
    },
    {
      name: 'Solgaleo',
      height: 11,
      type: ['ghost', ' fire', ' dark', ' ground']
    },
    {
      name: 'Psyduck',
      height: 2,
      type: 'water',
      weakness: ['grass', ' electric']
    },
    {
      name: 'Yveltal',
      height: 19,
      type: ['dark', ' flying'],
      weakness: ['fairy', ' electric', ' ice', ' rock']
    },
    {
      name: 'Piloswine',
      height: 3,
      type: ['ice', ' ground'],
      weakness: ['steel', ' fire', ' grass', ' water', ' fighting']
    },
    {
      name: 'Unown',
      height: 1,
      type: 'psychich',
      weakness: ['ghost', ' dark', ' bug']
    },
    {
      name: 'Magnemite',
      height: 1,
      type: ['electric', ' steel'],
      weakness: ['fire', ' fighting', ' ground']
    },
    {
      name: 'Mamoswine',
      height: 8,
      type: ['ice', ' ground'],
      weakness: ['steel', ' fire', ' grass', ' water', ' fighting']
    },
    {
      name: 'Eevee',
      height: 1,
      type: ['normal'],
      weakness: ['fighting']
    },
    {
      name: 'Pikachu',
      height: 1,
      type: ['electric'],
      weakness: ['ground']
    },
    {
      name: 'Squirtle',
      height: 2,
      type: ['water'],
      weakness: ['grass', ' electric']
    },
    {
      name: 'Poliwag',
      height: 2,
      type: ['water'],
      weakness: ['grass', ' electric']
    },
  ];

  function add(pokemon){
    if(
      typeof pokemon === 'pbject' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      pokemonList.push (pokemon);
    } else {
      console.log('this is not a pokemon');
    }
  }

  function getAll(){
    return pokemonList;
  }

//new function to simplify the forEach loop

  function addListItem(pokemon){
    let pokemonList = document.querySelector ('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    //Add event 'click' listener 
    button.addEventListener ('click', function (){
      showDetails(pokemon);
    });
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  function showDetails(pokemon){
    console.log()
  }

//the IIFE returns only an object with the same names for keys as values

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

//Here comes the 'forEach' loop, now updated so that it is accessed throught the IIFE

pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});

/*function divide(dividend, divisor) {
  if ('divisor' === 0){
    return 'You are trying to divide by zero.')
  }else{
    let result = dividend / divisor;
    return result;
  }
}

console.log(divide(4,2));*/
