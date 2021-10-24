
let pokemonRepository = (function() {
  let modalContainer = document.querySelector('#modal-container');
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // // Sort the Pokemon alphabetically
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
  };

  //new function to simplify the forEach loop
  function addListItem(pokemon) {
    let pokemonList = document.querySelector ('.pokemon-list');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('group-list-item', 'col-lg-6', 'col-md-4', 'col-sm-2');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-warning', 'btn-block');

    //link buttons to modalContainer
    button.setAttribute('data-target', '#modalContainer');
    button.setAttribute('data-toggle', 'modal');


    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    //Add event 'click' listener
    button.addEventListener ('click', function () {
      showDetails(pokemon);
    });


  }

  // // Add functions for showing and hiding Loading Message - REVIEW
  // function showLoadingMessage() {
  //   document.querySelector('.loading-message').classList.add('visible');
  // }
  //
  // function hideLoadingMessage() {
  //   document.querySelector('.loading-message').classList.add('hidden');
  // }

  //add loadList function to fetch data from API
  function loadList() {
    // showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      // hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          height: item.height,
          types: item.types
        };
        add(pokemon);
      });
    }).catch(function (e) {
      // hideLoadingMessage();
      console.error(e);
    });
  }

  // add loadDetails function to load the detailed data for a given Pokemon
  function loadDetails(item) {
    // showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // hideLoadingMessage();
      //Now we add the details to the items
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      // hideLoadingMessage();
      console.error (e);
    });
  }

  // With this I should get the Pokemon's details logged to the console upon clicking its button as this function executes loadDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // function to show the modal
  function showModal(pokemon) {

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    //to close the modal with the close button
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.classList.add('pokemon-height');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.classList.add('pokemon-img');
    imageElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}

  function hideModal() {
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  //to close the modal with the Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //to close the modal by clicking outside the modal
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    //We want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  //the IIFE returns only an object with the same names for keys as values
  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    // showModal: showModal
  };
})();

//Here comes the 'forEach' loop, now updated so that it is accessed throught the IIFE
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
