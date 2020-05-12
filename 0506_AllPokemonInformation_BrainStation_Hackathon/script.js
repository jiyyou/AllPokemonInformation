const formEl = document.querySelector('.user');
const cardSelector = document.querySelector('.pokecard');
const cardSelector2 = document.querySelector('.pokedex__image');

formEl.addEventListener('submit', event => {
	event.preventDefault();
	cardSelector.innerHTML = "";
	let userInput = event.target.pokeName.value;
	let pokeAPI = axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964`);
	pokeAPI.then(response => {
		for (let i = 0; i < response.data.results.length; i++) {
			if (response.data.results[i].name === userInput) {
				let pokeURL = response.data.results[i].url;
				const pokeAPI2 = axios.get(pokeURL);
				pokeAPI2.then(response => {
					let imgSelector = document.createElement('img');
					imgSelector.classList.add('pokecard__image')
					imgSelector.src = response.data.sprites['front_default'];
					cardSelector2.appendChild(imgSelector);
					let nameSelector = document.createElement('h1');
					nameSelector.innerText = `Pokemon Name: ${response.data.name}`;
					nameSelector.classList.add('pokecard__name');
					cardSelector.appendChild(nameSelector);
					for (let i = 0; i < response.data.types.length; i++) {
	 					let typeSelector = document.createElement('h2');
	 					typeSelector.innerText = `Pokemon Type ${i + 1}: ${response.data.types[i].type.name}`;
	 					typeSelector.classList.add('pokecard__type');
	 					cardSelector.appendChild(typeSelector);
					}
					let listContainer = document.createElement('ul');
					cardSelector.appendChild(listContainer);
					for (let i = 0; i < response.data.stats.length; i++) {
						let list = document.createElement('li');
						list.innerText = `${response.data.stats[i].stat.name}: ${response.data.stats[i].base_stat}`
						listContainer.appendChild(list);
					}
				})
			}
		}
	})
	event.target.reset();
	cardSelector2.innerHTML = "";
})