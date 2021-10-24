
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
    listPokemon.classList.add('group-list-item', 'col-lg-4', 'col-md-6');

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

  //add loadList function to fetch data from API
  function loadList() {
    // showLoadingMessage();
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
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  // add loadDetails function to load the detailed data for a given Pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {

      //Now we add the details to the items
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.type = details.types;
    }).catch(function (e) {
      console.error (e);
    });
  }

  // With this I should get the Pokemon's details logged to the console upon clicking its button as this function executes loadDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  let modalContainer = document.querySelector('#modal-container');

  // function to show the modal
  function showModal(pokemon) {

    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let titleElement = $('<h1>' + pokemon.name + '</h1>');
    //
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    //
    // let imageElement = $('<img class='modal-img'>');
    // imageElement.attr('src', pokemon.imageUrl);


    // let pokemonTypes = [];
		// 	Object.keys(pokemon.types).forEach(key => {
		// 		pokemonTypes.push(' ' + pokemon.types[key].types.name);
		// 	});
		// let typesElement = document.createElement('p');
		// typesElement.innerText = 'Type: ' + pokemonTypes;
		// typesElement.classList.add('types-element');


    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    // modalBody.append(imageElement);
    // modalBody.append(typesElement);

    modalContainer.classList.add('is-visible');
}

  function hideModal() {
    modalContainer.classList.remove('is-visible');

    // if (dialogPromiseReject) {
    //   dialogPromiseReject();
    //   dialogPromiseReject = null;
    // }
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
    showModal: showModal,
    hideModal: hideModal,
  };
})();

//Here comes the 'forEach' loop, now updated so that it is accessed throught the IIFE
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
