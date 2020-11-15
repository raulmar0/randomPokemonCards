const API = 'https://pokeapi.co/api/v2/'



const getData = async (hash, num) => {
  const apiURL = `${API}${hash}${num}`
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)
    if (data) {
      return data
    } else {
      return ''
    }
    // return data
  } catch (error) {
    console.log('Fetch error', error)
  }
}

const card = async () => {
  const DEX_NUM = Math.ceil(Math.random() * 893)
  const ITEM_NUM = Math.ceil(Math.random() * 1005)
  const pokemon = await getData('pokemon/', DEX_NUM)
  const item = await getData('item/', ITEM_NUM)
  const randomAbility = Math.floor(Math.random() * pokemon.abilities.length)
  const ability = pokemon.abilities[randomAbility].ability.name
  const randomMovesIndex = []
  const randomMoves = []

  for (let i = 0; i < 4; i++) {
    randomMovesIndex.push(Math.floor(Math.random() * pokemon.moves.length))
  }

  for (index of randomMovesIndex) {
    randomMoves.push(pokemon.moves[index].move.name)
    console.log(index)
  }

  console.log(ability)


  const view = `
  <div class="pkmn-card__upper"><h1>${pokemon.name}</h1></div>
    <div class="pkmn-card__lower">
      <figure class="pkmn-img"><img src=${pokemon.sprites.front_default} alt=""></figure>
      <div class="pkmn-data">
        <div class="pkmn-item">
          <h2 class="pkmn-item__name">Item: <span>${item.name}</span></h2>
          <figure class="pkmn-item__img"><img src="${item.sprites.default}" alt=""></figure>
        </div>
        <h2 class="pkmn-ability">Ability: <span> ${ability}</span></h2>
        <div class="pkmn-moves">
          <h2 class="pkmn-moves__title">Moves</h2>
          <div class="pkmn-moves__list">
            <button class="move">${randomMoves[0]}</button>
            <button class="move">${randomMoves[1]}</button>
            <button class="move">${randomMoves[2]}</button>
            <button class="move">${randomMoves[3]}</button>
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

