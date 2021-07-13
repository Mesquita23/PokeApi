const readline = require('readline-sync')
const axios = require('axios')

async function start(){
    const squirtleJson = await returnJSON("squirtle")
    var squirtle = createObjectPokemon(squirtleJson.data)
    
    const pokemonTyped = searchPokemon()
    const api = await returnJSON(pokemonTyped)
    
    var pokemon = createObjectPokemon(api.data)

    battle(squirtle, pokemon)

    
    
}

function showWinner(pokemon1, pokemon2){
    if (pokemon1.hp <= 0 ){
        console.log(`-------------------- ${pokemon2.name} venceu ---------------------------`)
    }else if(pokemon2.hp <= 0 ){
        console.log(`-------------------- ${pokemon1.name} venceu ---------------------------`)
    }
}

function battle(pokemon1, pokemon2){
    while (pokemon1.hp > 0 && pokemon2.hp > 0){
        attack(pokemon1, pokemon2)
        attack(pokemon2, pokemon1)

        showWinner(pokemon1, pokemon2)
    }
}

function attack(pokemon1, pokemon2){
    const defense = defenseOf(pokemon2)
    console.log(defense)
    const damage = pokemon1.attack * defense
    console.log(`attack do ${pokemon1.name}: ${damage}`)
    pokemon2.hp = pokemon2.hp - damage
    console.log(`${pokemon2.name}: ${pokemon2.hp} hp`)
}

function defenseOf(pokemon){
    const def = (pokemon.defense/100)
    if(def > 0.5 ){
        return 0.5
    }else{
        return def
    }
}

function returnTruebyChance(chance){
    const random = Math.random();
    percantage = (parseInt(chance)/100)
    if(random < percantage){
        return true
    }
    return false

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
    console.log(object)
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
