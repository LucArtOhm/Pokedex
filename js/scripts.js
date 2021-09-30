let pokemonList = [
  lunala = {
      name: 'Lunala',
      height: 13,
      type: ['psychich', 'ghost']
    },
  solgaleo = {
      name: 'Solgaleo',
      height: 11,
      type: ['psyhich', 'steel']
    },
  psyduck = {
      name: 'Psyduck',
      height: 2,
      type: 'water'
    },
  yveltal = {
      name: 'Yveltal',
      height: 19,
      type: ['dark', 'flying']
    },
  pilowswine = {
      name: 'Pilowswine',
      height: 3,
      type: ['ice', 'ground']
    },
  unown = {
      name: 'Unown',
      height: 1,
      type: 'psychich'
    },
  magnemite = {
      name: 'Magnemite',
      height: 1,
      type: ['electric', 'steel']
    },
]

//Here comes the 'for loop'

for (let i = 0; i < pokemonList.length; i++){
  if (pokemonList [i].height > 13 && pokemonList [i].height < 20){
    document.write (pokemonList [i].name + ' (' + 'height: ' + pokemonList [i].height + ' )' + ' - Wow, she\'s enormous!!!');
  } else if (pokemonList [i].height > 2){
    document.write (pokemonList [i].name + ' (' + 'height: ' + pokemonList [i].height + ' )' + ' - a mini Poki!');
  } else {
    document.write (pokemonList [i].name + ' (' + 'height: ' + pokemonList [i].height + ' )');
  }
}
