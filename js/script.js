const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const audio = document.querySelector('.somDaPokedex')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')
const buttonPlay = document.querySelector('.btn-audio')
const somDoPokemon = document.querySelector('.sound')
let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status ===200){
    const data = await APIResponse.json()
    return data;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML ='Loading...';
    pokemonNumber.innerHTML ="";

    const data = await fetchPokemon(pokemon)

    if(data){
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    audio.innerHTML = `<audio class= "sound" autoplay="autoplay" controls="controls"> <source class="som" src="./sounds/${data.id}.mp3" type="audio/mp3"/></audio>`
    searchPokemon = data.id
    }
    else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML='Not found'
        pokemonNumber.innerHTML='???'
    }
}
/*
const sound =async (pokemonNumber)=>{
    
    audio.innerHTML = `<source class="som" src="./sounds/${pokemonNumber}.mp3" type="audio/mp3"/>`
}
*/

form.addEventListener('submit', (event) =>{

    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
    input.value=''
})
buttonPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
    searchPokemon -= 1
    renderPokemon(searchPokemon)
}
})

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

/*
somDoPokemon.addEventListener('click', () =>{
    audio.play();
})
*/


renderPokemon(searchPokemon)