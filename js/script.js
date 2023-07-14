const pokemonName = document.querySelector(".pokemon_name")
const pokemonNumber = document.querySelector(".pokemon_number")
const pokemonImage = document.querySelector(".pokemon_image")
const form = document.querySelector(".form")
const input = document.querySelector(".input_search")
const btnPrev = document.querySelector(".btn_prev")
const btnNext = document.querySelector(".btn_next")

let searchPokemnon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading"
    pokemonNumber.innerHTML = "?"
    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = "block"
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src =
            data["sprites"]["versions"]["generation-v"]["black-white"][
                "animated"
            ]["front_default"]
        input.value = ""
        searchPokemnon = data.id
    } else {
        pokemonImage.style.display = "none"
        pokemonName.innerHTML = "Not found :C"
        pokemonNumber.innerHTML = ""
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btnNext.addEventListener("click", () => {
    searchPokemnon += 1
    renderPokemon(searchPokemnon)
})

btnPrev.addEventListener("click", () => {
    if (searchPokemnon > 1) {
        searchPokemnon -= 1
        renderPokemon(searchPokemnon)
    }
})

renderPokemon(searchPokemnon)
