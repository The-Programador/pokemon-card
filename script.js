const CARD = `<div class="card hidden">
            <p>Pokémon!!</p>
         </div>
        `
let base = 0
let limit = 9
let count = 0
let pokemonsList = ''

fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
.then(response => response.json())
.then(data => {
    count = data.count
    pokemonsList = data.results
    gerar(9)
})



//Isso aqui é ssincronismo!!
function gerar(amount, content='', flag=true) {
    if(base < count) {
        if(base < count) {
            let body = document.getElementsByClassName('box')[0]
            for(let i = 0; i < amount; i++) {
                body.insertAdjacentHTML('beforeend', CARD)
                if(base === (count-1)) {
                    break
                }
            }
            if(flag) {
                search() 
            } else {
                search2(content)
            }
        }
    }
}

//Isso aqui é ssincronismo!!
function show() {
    let card = document.getElementsByClassName('card')
    for(let i = 0; i < card.length; i++) {
        card[i].style.display = 'flex';
    }
}

//Isso aqui é sincronismo!!
//OTIMZAR Essas duas funções
function search() {
    for(base; base < limit; base++) {
        if(base < count) {
            getPokemonData(pokemonsList[base].name, base)
            if(base === (count-1)) {
                break
            }
        }
    }
    limit += 9
    setTimeout(show, 98) //Não muito útil :/
}

function search2(content) {
    for(base; base < limit; base++) {
        if(base < count) {
            getPokemonData(content[base].pokemon.name, base)
        }
    }
    setTimeout(show, 98) //Não muito útil :/
}

//Isso aqui é assincronismo!!
//OTIMIZAR ESSA FUNÇÂO
const getPokemonData = async (_namePokemon, id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${_namePokemon}`)
    .then(response => response.json())

    //Requisicão bem sucedida.
    .then(data => {
        let resource = data.sprites
        let imgURL1 = resource.other.dream_world.front_default;
        let imgURL2 = resource.front_default;
        let imgURL = imgURL1 === null ? imgURL2:imgURL1;
        let card = document.getElementsByClassName('card')
        card[id].id = _namePokemon
        card[id].addEventListener('click', () => {
            showModal(card[id].id)
        })
        card[id].innerHTML = `
            <p>#${data['id']} ${data['name']}</p>
            <div class="box-image"><img class="image" src="${imgURL}"></div>`;

    })

    //Requisição mal-sucedida.
    .catch(err => {
        //alert('Pokemon não encontrado!');
    })
}

const filterDataPokemon = _content => {
    let info = []
    //Basic informations
    let name = _content.name;
    let order = _content.id;
    let baseExperience = _content.base_experience
    let urlSpecie = _content.species.url //Outro endpoint da API
    let types = _content.types;
    let weight = _content.weight / 10 //Hectograma para Kilograma
    let height = _content.height / 10 //Decimêtro para Metro
    //Stats
    let stats = []; //Vai receber as estatísticas básicas
    let statsList = _content.stats;
    for(let stat in statsList) {
        stats.push(statsList[stat].base_stat);
    }
    let abilities = []
    for(let ability in _content.abilities) {
        abilities.push(_content.abilities[ability])
    }
    //Image
    let resource = _content.sprites
    let imgURL1 = resource.other.dream_world.front_default;
    let imgURL2 = resource.other['official-artwork'].front_default;
    let imgURL = imgURL1 === null ? imgURL2:imgURL1;
    info.push(name, imgURL, stats, order, weight, height, urlSpecie, types, abilities, baseExperience);
    return info;
}

const showModal = (id) => {
    hiddenScrollBars()
    if(!isNaN(id)) {
        id = Number(id)
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    //Requisicão bem sucedida.
    .then(data => {
        function constructColor(url) {
            fetch(url)
            .then(response =>
                response.json())
            .then(data => {
                let color = data['color']['name']
                if(color == 'white') {
                    color = '#ebebeb'
                }
                cardBackground.style.backgroundColor = color
            })
            .catch(error => {
                cardBackground.style.backgroundColor = 'lightgray'
            })
        }

        let _info = filterDataPokemon(data)
        constructColor(_info[6])
        let cardBackground = document.createElement('div')
        let cardPokemonTitle = document.createElement('p')
        let cardPokemonImage = document.createElement('div')
        let pokemonImage = document.createElement('img')
        let subCard = document.createElement('div')
        let subCardInfoBio = document.createElement('div')
        let subCardInfoBioLevel1 = document.createElement('div')
        let left = document.createElement('div')
        let right = document.createElement('div')
        let type = document.createElement('p')
        let abilities = document.createElement('p')
        let baseExperience = document.createElement('p')
        let baby = document.createElement('p')
        let legendary = document.createElement('p')
        let mythical = document.createElement('p')
        let weightPokemon = document.createElement('p')
        let heightPokemon = document.createElement('p')
        let weaknessBox = document.createElement('div')
        let weakness = document.createElement('div')
        let boxStats = document.createElement('div')
        let boxStatsTitle = document.createElement('p')
    
        cardBackground.className = 'card-background'
        cardPokemonTitle.className = 'card-pokemon-title';
        cardPokemonImage.className = 'card-pokemon-image';
        pokemonImage.className = 'pokemon-image';
        subCardInfoBio.className = 'sub-card-info-bio'
        subCardInfoBioLevel1.className = 'bio-level1'
        type.className = 'type';
        abilities.className = 'abilities'
        baseExperience.className = 'base-experience'
        baby.className = 'baby'
        legendary.className = 'legendary'
        mythical.className = 'mythical'
        weightPokemon.className = 'weight-pokemon';
        heightPokemon.className = 'height-pokemon';
        weaknessBox.className = 'weakness-box'
        weakness.className = 'weakness'
        subCard.className = 'sub-card';
        boxStats.className = 'box-stats';
        boxStatsTitle.className = 'box-stats-title'
        //boxStatsTitle.className = 'box-stats-title'

        let statsList = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special-Defence', 'Speed']

        boxStatsTitle.textContent = 'Stats';
        boxStats.appendChild(boxStatsTitle);

        //Constrói as Stats
        for(let pos in _info[2]) {
            //Define o Elementos
            let nameStat = document.createElement('span')
            let bar = document.createElement('span')
            let barMin = document.createElement('span')
            let stat = document.createElement('p');
            //Define as Classes
            nameStat.className = 'name-stat'
            bar.className =  'bar';
            barMin.className =  'bar-min';
            stat.className = 'stat';
            //Atribui os valores das stats e adiciona sub-área
            nameStat.insertAdjacentHTML("beforeend",`<span>${statsList[pos]}</span> <span class="stats-value">${_info[2][pos]}</span>`)
            barMin.style.width = `${_info[2][pos]*1.7}px`;
            bar.appendChild(barMin)
            boxStats.appendChild(stat)
            stat.appendChild(nameStat)
            stat.appendChild(bar)
        }

        type.insertAdjacentHTML('beforeend', `<span class="type-title">Type</span>`)

        weakness.insertAdjacentHTML('beforeend', `<p>weakness</p>`)

        for(let indice in _info[7]){
            type.insertAdjacentHTML('beforeend', `<span class="${_info[7][indice].type.name}">${_info[7][indice].type.name}</span>`)
            fetch(_info[7][indice].type.url)
            .then(response => response.json())
            .then(data => {
                data.damage_relations.double_damage_from.forEach((damage) => {
                    weakness.insertAdjacentHTML('beforeend', `<span class="${damage.name}">${damage.name}</span>`) 
                })
            })
        }

        abilities.insertAdjacentHTML('beforeend', `<span class="title-abilities">Abilities</span>`)

        for(ability of _info[8]) {
            let name = ability.ability.name
            abilities.insertAdjacentHTML('beforeend', `<span class="name-ability">${name}</span>`)
        }

        baseExperience.insertAdjacentHTML('beforeend', `<span>base exp</span><span>${_info[9]}</span>`)


        weightPokemon.insertAdjacentHTML('beforeend', `<span>Weight:</span> <span>${_info[4]}kg</span>`);

        heightPokemon.insertAdjacentHTML('beforeend', `<span>Height:</span> <span>${_info[5]}m</span>`);
        
        cardPokemonTitle.textContent = `${_info[0]} #${_info[3]}`;
        pokemonImage.setAttribute('src', _info[1])
        cardPokemonImage.appendChild(pokemonImage)
        right.appendChild(type)
        right.appendChild(abilities)
        right.appendChild(baby)
        right.appendChild(legendary)
        right.appendChild(mythical)
        left.appendChild(weightPokemon)
        left.appendChild(heightPokemon)
        left.appendChild(baseExperience)
        weaknessBox.appendChild(weakness)
        subCardInfoBioLevel1.appendChild(left)
        subCardInfoBioLevel1.appendChild(right)
        subCardInfoBio.appendChild(subCardInfoBioLevel1)
        subCardInfoBio.appendChild(weaknessBox)
        subCard.appendChild(boxStats);

        let button = document.createElement('button')
        button.textContent = 'X'
        button.className = 'button-close';
        button.addEventListener('click', closeModal)
        let body = document.getElementsByTagName('body')[0];
        let overlay = document.createElement('div')
        let modal = document.createElement('div');
        let modal2 = document.createElement('div');
        modal.appendChild(button)
        //modal2.appendChild(button2)
        overlay.className = 'overlay';
        modal.className = 'modal';
        modal2.className = 'sub-modal-card';

        //cards[id].innerHTML = '';
        modal.appendChild(cardBackground)
        modal.appendChild(cardPokemonTitle)
        modal.append(cardPokemonImage)
        modal.appendChild(subCardInfoBio)
        modal.append(subCard)
        modal.appendChild(modal2)
        overlay.appendChild(modal)
        body.appendChild(overlay)

        //Cadeia de Evolução
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(response => response.json())
        .then(data => {
            let evURL = data.evolution_chain.url
            let captureRate = data.capture_rate
            let isBaby = data.is_baby
            let isLegendary = data.is_legendary
            let isMythical = data.is_mythical
            
            baby.insertAdjacentHTML('beforeend', `<span>is baby</span><span>${isBaby}</span>`)
            legendary.insertAdjacentHTML('beforeend', `<span>is legendary</span><span>${isLegendary}</span>`)
            mythical.insertAdjacentHTML('beforeend', `<span>is mythical</span><span>${isMythical}</span>`)

            let lv2 = null
            let lv3 = null
            let imgLv1
            let imgLv2
            let imgLv3
            fetch(evURL)
            .then(response => response.json())
            .then(evData => {
                //lv1
                let lv1 = evData.chain.species.name
                fetch(`https://pokeapi.co/api/v2/pokemon/${lv1}`)
                .then(response => response.json())
                .then(data => {
                    let resource = data.sprites
                    let imgURL1 = resource.other.dream_world.front_default;
                    let imgURL2 = resource.front_default;
                    imgLv1 = imgURL1 === null ? imgURL2:imgURL1;
                    modal2.insertAdjacentHTML('beforeend', `<p class="chain">${lv1}</p>
                    <img class="chain-img" src="${imgLv1}">`)

                    //lv2
                    if(evData.chain.evolves_to.length !== 0) {
                        lv2 = evData.chain.evolves_to[0].species.name
                        fetch(`https://pokeapi.co/api/v2/pokemon/${lv2}`)
                        .then(response => response.json())
                        .then(data => {
                            let resource = data.sprites
                            let imgURL1 = resource.other.dream_world.front_default;
                            let imgURL2 = resource.front_default;
                            imgLv2 = imgURL1 === null ? imgURL2:imgURL1;
                            modal2.insertAdjacentHTML('beforeend', ` <p class="chain">${lv2}</p>
                            <img class="chain-img" src="${imgLv2}">`)

                            //lv3
                            if(evData.chain.evolves_to[0].evolves_to.length !== 0) {
                                lv3 = evData.chain.evolves_to[0].evolves_to[0].species.name
                                fetch(`https://pokeapi.co/api/v2/pokemon/${lv3}`)
                                .then(response => response.json())
                                .then(data => {
                                    let resource = data.sprites
                                    let imgURL1 = resource.other.dream_world.front_default;
                                    let imgURL2 = resource.front_default;
                                    imgLv3 = imgURL1 === null ? imgURL2:imgURL1;modal2.insertAdjacentHTML('beforeend', `<p class="chain">${lv3}</p>
                                    <img class="chain-img" src="${imgLv3}">`)
                                })
                            }
                        })
                    }
                })
            })
        }) 
    })

    //Requisição mal-sucedia.
    .catch(err => {
        //alert('Pokemon não encontrado!');
    })
}

const closeModal = () => {
    let overlay = document.getElementsByClassName('overlay')[0]
    let modal = document.getElementsByClassName('modal')[0];
    overlay.remove()
    modal.remove()
    showScrollBars()
}

function hiddenScrollBars() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no"; // IE
}

function showScrollBars() {
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "no"; // IE
}

function searchBox() {
    let body = document.getElementsByClassName('box')[0]
    let content = document.getElementById('search').value.toLowerCase()
    let button = document.getElementById('gerar')
    if(button !== null)
        button.remove()
    body.innerHTML = ''
    if(!isNaN(content)) {
        content = Number(content)
    }
    body.insertAdjacentHTML('beforeend', CARD)
    getPokemonData(content, 0)
    show()

}

const constructFilter = () => {
    let boxFilter = document.getElementsByClassName('box-filter')[0]
    let typeAll = document.createElement('p')
    typeAll.className = 'box-type'
    typeAll.insertAdjacentHTML('beforeend', `<span>All</span>`)
    boxFilter.appendChild(typeAll)
    typeAll.addEventListener('click', () => {
        let button = document.getElementById('gerar')
        let body = document.getElementsByClassName('box')[0]
        button.style.display = 'flex'
        body.innerHTML = ''
        base = 0
        limit = 9
        gerar(9)
    })
    fetch('https://pokeapi.co/api/v2/type/')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(type => {
            let boxType = document.createElement('p')
            boxType.insertAdjacentHTML('beforeend', `<span>${type.name}</span>`)
            boxType.className = `box-type ${type.name}`
            boxType.addEventListener('click', () => {
                filterType(boxType.classList[1])
            })
            boxFilter.appendChild(boxType)
        })
    })
}

const filterType = (typeName) => {
    let button = document.getElementById('gerar')
    let body = document.getElementsByClassName('box')[0]
    body.innerHTML = ''
    button.style.display = 'none'
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
    .then(response => response.json())
    .then(data => {
        base = 0
        limit = data.pokemon.length
        gerar(data.pokemon.length, data.pokemon, false)
    })
}

constructFilter()

let button = document.getElementById('gerar');
button.addEventListener('click', () => {gerar(9)});

let buttonSearch =  document.getElementsByClassName('button-search')[0]
buttonSearch.addEventListener('click', searchBox)