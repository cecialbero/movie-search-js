const searchBtn = document.querySelector('#searchMovie button');
const userData = document.querySelector('#searchMovie input');
const cardsRow = document.getElementById('cardsRow');
const alertContainer = document.getElementById('alertContainer');
const alertBtn = document.querySelector('#alertContainer button');

// Helper fn
const setAttributes = (elem, attrs) => {
	for(let key in attrs) {
		elem.setAttribute(key, attrs[key]);
	}
}

userData.addEventListener('keydown', (event) => {
	let { target, keyCode } = event;
	if(keyCode === 13) {
		event.preventDefault();

		if(target.value == '') {
			showAlert('<strong>Holy guacamole! </strong>Looks like you need to insert a movie title', 'info');
		} else {
			getMoviesData(target.value);
			target.value = '';
		}
	}
}, false);

searchBtn.addEventListener('click', () => {
	console.log('click')
}, false);

const getMoviesData = async (movieTitle) => {
	const apiKey = '7dd0c5ac59abd42f68b68f767b9b42f4';
	
	try {
		let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}&include_adult=false`);
		let movies = await response.json();
		showSearchResults(movies);

	} catch(error) {
		console.log(error);
	}
}

const createCard = () => {
	const card = document.createElement('div');
	const article = document.createElement('article');
	const cardBody = document.createElement('div');
	const movieTitle = document.createElement('h5');
	const moviePoster = document.createElement('img');
	const movieDesc = document.createElement('p');

	card.className = 'col-3';
	movieTitle.className = 'card-title';
	cardBody.className = 'card-body';
	movieDesc.classname = 'card-text';
	article.className = 'card';

	return [card, article, cardBody, movieTitle, moviePoster, movieDesc];
}

const showSearchResults = ({results}) => {
	
	results.forEach(({poster_path, title, overview}) => {

		const cardElem = createCard();
		[card, article, cardBody, movieTitle, moviePoster, movieDesc] = cardElem;
		
		setAttributes(moviePoster, {'src': `https://image.tmdb.org/t/p/w300${poster_path}`, 'alt': title, 'class': 'card-img-top'});
		movieTitle.innerText = title;
		movieDesc.innerText = `${overview.substring(0, 150)}...`;

		cardsRow.append(card);
		card.append(article);
		article.append(moviePoster, cardBody);
		cardBody.append(movieTitle, movieDesc);
	});
}


// --- ALERT ----
const showAlert = (msg, type) => {

	if(!alertContainer.querySelector('span')) {
		alertContainer.className = `alert alert-${type} d-block`
		const text = document.createElement('span');
		text.innerHTML = msg;

		alertContainer.insertAdjacentElement('afterbegin', text);
		
		setTimeout(() => {
			alertContainer.className = 'alert d-none';
			alertContainer.removeChild(alertContainer.querySelector('span'));
		}, 4000);
	}

}

alertBtn.addEventListener('click', () => {
	alertContainer.className = 'alert d-none';
	alertContainer.removeChild(alertContainer.querySelector('span'));
})