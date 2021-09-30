let pokemonList = [
  lunala = {
      name: 'Lunala',
      height: 13,
      type: ['psychich', 'ghost'],
      weakness: ['ghost', 'dark']
    },
  solgaleo = {
      name: 'Solgaleo',
      height: 11,
      type: ['ghost', 'fire', 'dark', 'ground']
    },
  psyduck = {
      name: 'Psyduck',
      height: 2,
      type: 'water',
      weakness: ['grass', 'electric']
    },
  yveltal = {
      name: 'Yveltal',
      height: 19,
      type: ['dark', 'flying'],
      weakness: ['fairy', 'electric', 'ice', 'rock']
    },
  piloswine = {
      name: 'Piloswine',
      height: 3,
      type: ['ice', 'ground'],
      weakness: ['steel', 'fire', 'grass', 'water', 'fighting']
    },
  unown = {
      name: 'Unown',
      height: 1,
      type: 'psychich',
      weakness: ['ghost', 'dark', 'bug']
    },
  magnemite = {
      name: 'Magnemite',
      height: 1,
      type: ['electric', 'steel'],
      weakness: ['fire', 'fighting', 'ground']
    },
  mamoswine = {
      name: 'Mamoswine',
      height: 8,
      type: ['ice', 'ground'],
      weakness: ['steel', 'fire', 'grass', 'water', 'fighting']
      },
  eevee = {
      name: 'Eevee',
      height: 1,
      type: ['normal'],
      weakness: ['fighting']
      },
  pikachu = {
      name: 'Pikachu',
      height: 1,
      type: ['electric'],
      weakness: ['ground']
      },
  squirtle = {
      name: 'Squirtle',
      height: 2,
      type: ['water'],
      weakness: ['grass', 'electric']
      },
  poliwag = {
      name: 'Poliwag',
      height: 2,
      type: ['water'],
      weakness: ['grass', 'electric']
      },
]

//Here comes the 'for loop'

for (let i = 0; i < pokemonList.length; i++){
  if (pokemonList [i].height > 13 && pokemonList [i].height < 20){
    document.write (pokemonList [i].name + ' (' + 'height: ' + pokemonList [i].height + ' )' + ' - Wow, she\'s enormous!!!');
  } else if (pokemonList [i].height > 2){
    document.write (pokemonList [i].name + ' (' + 'height: ' + pokemonList [i].height + ' )');
  } else {
    document.write (pokemonList [i].name + ' (' + 'height: ' + pokemonList [i].height + ' )');
  }
}
