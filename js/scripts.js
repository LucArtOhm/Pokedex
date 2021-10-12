
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Sort the Pokemon alphabetically
  // const pokemonList = [];
  // pokemonList.sort(up);

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      pokemonList.push (pokemon);
    } else {
      console.log('pokemon is not correct');
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
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    //Add event 'click' listener
    button.addEventListener ('click', function (event) {
      showDetails(pokemon);
    });
  }

  //add loadList function to fetch data from API
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
            types: item.types
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

  // add loadDetails function to load the detailed data for a given Pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error (e);
    });
  }

  //With this I should get the Pokemon's details logged to the console upon clicking its button as this function executes loadDetails function
  function showDetails(item){
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  //the IIFE returns only an object with the same names for keys as values
  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//Here comes the 'forEach' loop, now updated so that it is accessed throught the IIFE
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
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
