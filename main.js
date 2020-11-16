const API = 'https://pokeapi.co/api/v2/'



const getData = async (API, hash, num) => {
  const apiURL = `${API}${hash}${num}`
  
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log('Fetch error', error)
    return ''
  }
}

const card = async () => {
  const DEX_NUM = Math.ceil(Math.random() * 893)
  const ITEM_NUM = Math.ceil(Math.random() * 141)

  const pokemon = await getData(API, 'pokemon/', DEX_NUM)
  const itemSelector = await getData(API, 'item-attribute/holdable-active/', '')
  // const itemURL = itemSelector.items[ITEM_NUM].url ? itemSelector.items[ITEM_NUM].url : itemSelector.items[ITEM_NUM].url
  
  while (!itemSelector.items[ITEM_NUM].url) {
    const ITEM_NUM = Math.ceil(Math.random() * 141)
    const itemSelector = await getData(API, 'item-attribute/holdable-active/', '')
  }

  const item = await getData('', itemSelector.items[ITEM_NUM].url, '')

  const randomAbility = Math.floor(Math.random() * pokemon.abilities.length)
  const ability = pokemon.abilities.length ? pokemon.abilities[randomAbility].ability.name : 'No ability'
  
  const randomMovesIndex = []
  const randomMoves = []

  for (let i = 0; i < 4; i++) {
    randomMovesIndex.push(Math.floor(Math.random() * pokemon.moves.length))
  }

  for (index of randomMovesIndex) {
    // randomMoves.push(pokemon.moves[index].move.name)
    pokemon.moves.length ? randomMoves.push(pokemon.moves[index].move.name) : ''
  }

  console.log(ability)


  const view = `
  <div class="pkmn-card__upper"><h1>${pokemon.name}</h1></div>
    <div class="pkmn-card__lower">
      <figure class="pkmn-img"><img src=${pokemon.sprites.front_default} alt=""></figure>
      <div class="pkmn-data">
        <div class="pkmn-item">
          <h2 class="pkmn-item__name">Item: <span>${itemSelector.items[ITEM_NUM].name}</span></h2>
          <figure class="pkmn-item__img"><img src="${item.sprites.default}" alt=""></figure>
        </div>
        <h2 class="pkmn-ability">Ability: <span> ${ability}</span></h2>
        <div class="pkmn-moves">
          <h2 class="pkmn-moves__title">Moves</h2>
          <div class="pkmn-moves__list">
          ${randomMoves.map(move => `
            <button class="move">${pokemon.moves.length ? move : '-'}</button>
          `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  return view
}

const router = async () => {
  const content = null || document.getElementById('card')
  const cardContent = await card()
  content.innerHTML = cardContent
}

window.addEventListener('load', router)

