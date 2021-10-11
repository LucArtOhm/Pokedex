
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

//add loadList function to fetch data from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  return{
    add: add,
    getAll: getAll,
    loadList: loadList
  };
})();

//add loadDetails function to load the detailed data for a given Pokemon
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then (function (details) {
    //Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.types;
  }).catch(function (e) {
    console.error (e);
  });
}

return{
  add: add,
  getAll: getAll,
  loadList: loadList,
  loadDetails: loadDetails
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
