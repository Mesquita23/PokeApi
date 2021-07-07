const readline = require('readline-sync')
const axios = require('axios')

async function start(){
    
    const pokemonTyped = searchPokemon()
    const api = await returnJSON(pokemonTyped)
    var pokemon = createObjectPokemon(api.data)
    
}

function searchPokemon(){
    return readline.question('Digite o nome de um pokemon: ')
}

async function returnJSON(pokemon){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    return response
}

function createObjectPokemon(data){
    var object = new Object()
    object.id = data.id
    object.name = data.name
    object.weight = `${parseFloat(data.weight/10)} kg`
    object.height = `${parseFloat(data.height/10)} m`
    getStatus(object ,data.stats)
    return object

}

function getStatus(object, status){
    object.hp = status[0].base_stat
    object.attack = status[1].base_stat
    object.defense = status[2].base_stat
    object.speed = status[5].base_stat
    object.special_attack = status[3].base_stat
    object.special_defense = status[4].base_stat
}

function verifyAbilities( object, abilities ){
    if(abilities != null){
        for(ab in abilities){
            object.habilidades += ab
        }
        return object
    }else{
        return object
    }
}

start()
