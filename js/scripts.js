/* eslint-env jquery */

let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }
  function getAll() {
    return pokemonList;
  }

  //new function to simplify the forEach loop
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('group-list-item', 'col-lg-4', 'col-md-6');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-warning', 'btn-block');

    //link buttons to modalContainer
    button.setAttribute('data-target', '#modal-container');
    button.setAttribute('data-toggle', 'modal');

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    //Add event 'click' listener
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  //add loadList function to fetch data from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
            types: item.types,
            weight: item.weight
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // add loadDetails function to load the detailed data for a given Pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        //Now we add the details to the items
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // With this I should get the Pokemon's details logged to the console upon clicking its button as this function executes loadDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // function to show the modal
  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1>' + pokemon.name + '</h1>');

    let heightElement = $(
      '<p>' + 'Height: ' + pokemon.height + ' ' + '\'' + '</p>'
    );

    let weightElement = $(
      '<p>' + 'Weight: ' + pokemon.weight + ' ' + 'lbs.' + '</p>'
    );

    let imageElement = document.createElement('img');
    imageElement.classList.add('pokemon-img');
    imageElement.src = pokemon.imageUrl;

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(imageElement);
    modalBody.append(weightElement);
  }

  function find(pokemonName) {
    let result = pokemonList.filter(pokemon => pokemon.name === pokemonName);
    console.log(result[0]);
  }

  //the IIFE returns only an object with the same names for keys as values
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    find: find
  };
})();

//Here comes the 'forEach' loop, now updated so that it is accessed throught the IIFE
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
