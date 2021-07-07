const readline = require('readline-sync')
const axios = require('axios')

async function start(){
    const pokemon = searchPokemon()
    const api = await returnJSON(pokemon)
    var habilitylist = getStatus(api.data.stats)

    const ability_1 = api.data.abilities[0].ability.name
    const ability_2 = api.data.abilities[1].ability.name
    const weight = api.data.weight
    const height = api.data.height
    
    var response = `
pokemon: ${pokemon}
habilidade 1: ${ability_1}
habilidade 2: ${ability_2}
peso: ${weight}
altura: ${height}

status: \n`
    for(var i = 0; i < habilitylist.length; i++ ){
        response += `${habilitylist[i].name}: ${habilitylist[i].value} \n`
    }
    console.log(response)
}

async function returnJSON(pokemon){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    return response
}

function getStatus(status){
    var arrayHabilitys = new Array()
    for(var i = 0; i < status.length ; i++){
        var hability = new Object()
        hability.name = status[i].stat.name
        hability.value = status[i].base_stat
        arrayHabilitys.push(hability)
    }
    return arrayHabilitys
}

function searchPokemon(){
    return readline.question('Digite o nome de um pokemon: ')
}

start()
