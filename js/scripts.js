
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
      //Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error (e);
    });
  }

  // With this I should get the Pokemon's details logged to the console upon clicking its button as this function executes loadDetails function
  function showDetails(item){
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

// //   //function to show the modal
  function showModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });
// //
// //
// //   function showModal(title, text) {
// //     modalContainer.innerHTML = '';
// //
// //     let modal = document.createElement('div');
// //     modal.classList.add('modal');
// //
// //     let closeButtonElement = document.createElement('button');
// //     closeButtonElement.classList.add('modal-close');
// //     closeButtonElement.innerText = 'Close';
// //     closeButtonElement.addEventListener('click', hideModal);
// //
// //     let titleElement = document.createElement('h1');
// //     titleElement.innerText = title;
// //
// //     let contentElement = document.createElement('p');
// //     contentElement.innerText = text;
// //
// //     modal.appendChild(closeButtonElement);
// //     modal.appendChild(titleElement);
// //     modal.appendChild(contentElement);
// //     modalContainer.appendChild(modal);
// //
// //     modalContainer.classList.add('is-visible');
// // }
// //
// // //In order to close the modal...
// //   let dialogPromiseReject;
// //
// //   function hideModal() {
// //     modalContainer.classList.remove('is-visible');
// //
// //     if (dialogPromiseReject) {
// //       dialogPromiseReject();
// //       dialogPromiseReject = null;
// //     }
// // }
// //
// //   function showDialog(title, text) {
// //     showModal(title, text);
// //   }
// //
// //     //Add a confirm and cancel button to the modalContainer
// //     let modal = modalContainer.querySelector('.modal');
// //
// //     let confirmButton = document.createElement('button');
// //     confirmButton.classList.add('modal-confirm');
// //     confirmButton.innerText = 'Confirm';
// //
// //     let cancelButton = document.createElement('button');
// //     cancelButton.classList.add('modal-cancel');
// //     cancelButton.innerText = 'Cancel';
// //
// //     modal.appendChild(confirmButton);
// //     modal.appendChild(cancelButton);
// //
// //     //Focus the confirmButton so that the user can simply press Enter
// //     confirmButton.focus();
// //
// //     //In order to return the promise
// //     return new Promise((resolve, reject) => {
// //       cancelButton.addEventListener('click', hideModal);
// //       confirmButton.addEventListener('click', () => {
// //         dialogPromiseReject = null; //Reset this
// //         hideModal();
// //         resolve();
// //       });
// //       //This can be used to reject from other functions
// //       dialogPromiseReject = reject;
// //     });
// //     }
// //
// //   //Add promise to check whether a person has confirmed or not
// //   document.querySelector('#show-dialog').addEventListener('click', () => {
// //     showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
// //       alert('confirmed!');
// //     }, () => {
// //       alert('not confirmed');
// //     });
// //   });
// //
// //   window.addEventListener('keydown', (e) => {
// //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
// //       hideModal();
// //     }
// //   });
// //
// // modalContainer.addEventListener('click', (e) => {
// //     // Since this is also triggered when clicking INSIDE the modal
// //     //We want to close if the user clicks directlz on the overlay
// //   let target = e.target;
// //   if (target === modalContainer) {
// //     hideModal();
// //   }
// // });
// //
// // document.querySelector('#show-modal').addEventListener ('click', () => {
// //   showModal('Modal Title', 'This is the modal content, what?');
// // })

  //the IIFE returns only an object with the same names for keys as values
  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    // showDetails: showDetails,
    // showModal: showModal
  };

})();

//Here comes the 'forEach' loop, now updated so that it is accessed throught the IIFE
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
