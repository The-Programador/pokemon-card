function showMenu(id) {
    let boxmenu = document.getElementsByClassName('menu')[id];
    console.log(boxmenu)
    boxmenu.className = 'menu'
    showElements(id)
}

let listNamePokemon = []

//Constrói e exibe a lista do menu de seleção de pokémons
async function showElements(id) {
    let box = document.getElementsByTagName('input')[id];
    let boxmenu = document.getElementsByClassName('menu')[id];
    if(flag) {
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(response => response.json())
        .then(data => {
            box.addEventListener('focusout', (id) => setTimeout(function(){
                boxmenu.className = 'menu hidden-menu'
            }, 120))
            for(let pokemon in listNamePokemon)  {
                let p = document.createElement('option')
                p.innerText = listNamePokemon[pokemon]
                p.addEventListener('click', () => {
                    box.value = p.innerText; 
                    hideMenu(id);
                })
                boxmenu.appendChild(p)
                //boxmenu.insertAdjacentHTML('beforeend', `<p><a href="#">${data.results[pokemon].name}</p></a>`)
            }
        })
        .catch(err => {
            console.log(err)
        })

    } else {
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(response => response.json())
        .then(data => {
            listNamePokemon = []
            box.addEventListener('focusout', (id) => setTimeout(function(){
                boxmenu.className = 'menu hidden-menu'
            }, 120))
            for(let pokemon in data.results)  {
                let p = document.createElement('option')
                p.innerText = data.results[pokemon].name
                p.addEventListener('click', () => {
                    box.value = p.innerText; 
                    hideMenu(id);
                })
                boxmenu.appendChild(p)
                //boxmenu.insertAdjacentHTML('beforeend', `<p><a href="#">${data.results[pokemon].name}</p></a>`)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}

let flag = true

//Pré-carrega para uma lista os nomes de pokémons otimizando o menu de seleção e a experiência do usuário.
async function loadNamePokemon(id) {
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0').then(response => response.json())
    .then(data => {
        for(let pokemon in data.results)  {
            listNamePokemon.push(data.results[pokemon].name)
        }
        console.log('Load NAme pokemon true')
    })
    .catch(err => {
        flag = false
    })
}

loadNamePokemon()

//Filtra o nome "pokémon" buscado do menu.
const filterName = (id) => {
    let box = document.getElementsByTagName('input')[id];
    let boxValue = document.getElementsByTagName('input')[id].value;
    let boxmenu = document.getElementsByClassName('menu')[id];
    boxmenu.innerHTML = ''
    box.addEventListener('focusout', (id) => setTimeout(function(){
        boxmenu.className = 'menu hidden-menu'
    }, 200))
    
    let newListNamePokemon = listNamePokemon.filter((name) => {
        return name.includes(boxValue)
    })

    for(let pokemonName in newListNamePokemon)  {
        let p = document.createElement('option')
        p.innerText = newListNamePokemon[pokemonName]
        p.addEventListener('click', () => {
            box.value = p.innerText; 
            hideMenu(id);
        })
        boxmenu.appendChild(p)
        boxmenu.className = 'menu'
        //boxmenu.insertAdjacentHTML('beforeend', `<p><a href="#">${data.results[pokemon].name}</p></a>`)
    }
    console.log(listNamePokemon)
}

//Esconde o Menu
function hideMenu(id) {
    let boxmenu = document.getElementById('menu');
    boxmenu.className = 'menu hidden-menu'
}

//Adiciona eventos a elementos do Menu de Busca de Pokémon
let input1 = document.getElementsByTagName('input')[0];
input1.addEventListener('focus', () => showMenu(0));
input1.addEventListener('input', (id) => {
    id = 0;
    filterName(id);
})