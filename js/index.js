const searchBtn = document.querySelector('#searchMovie button');
const userData = document.querySelector('#searchMovie input');
const cardsRow = document.getElementById('cardsRow');
const alertContainer = document.getElementById('alertContainer');
const alertBtn = document.querySelector('#alertContainer button');
const searchFeedbackMsg = document.getElementById('searchFeedbackMsg');
const pagination = document.querySelector('.pagination');
const previousLink = document.querySelector('.pagination-previous');
const nextLink = document.querySelector('.pagination-next');

let movies;

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
			movies = target.value;
			target.value = '';
		}
	}
}, false);

searchBtn.addEventListener('click', () => {
	console.log('click')
}, false);

const getMoviesData = async (movieTitle, pageNumber = 1, createPaginator = true) => {
	const apiKey = '7dd0c5ac59abd42f68b68f767b9b42f4';
	
	try {
		let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}&include_adult=false&page=${pageNumber}`);
		let movies = await response.json();
		showSearchResults(movies);
		showSearchMessages(movies, movieTitle);

		if(movies.total_pages > 1 && createPaginator) {showPagination(movies)};

	} catch(error) {
		console.log(error);
	}
}

const showSearchResults = ({results}) => {
	const movieCards = document.querySelectorAll('#cardsRow .card');

	if(movieCards) {
		cardsRow.innerHTML = '';
	}

	results.forEach(({poster_path, title, overview}) => {
		const cardElem = createCard();
		[card, article, cardBody, movieTitle, moviePoster, movieDesc] = cardElem;

		console.log(poster_path)

		poster_path ? moviePoster.src = `https://image.tmdb.org/t/p/w300${poster_path}` : moviePoster.src = './images/placeholder-poster.jpg';
		setAttributes(moviePoster, {'alt': title, 'class': 'card-img-top'});
		movieTitle.innerText = title;
		movieDesc.innerText = `${overview.substring(0, 150)}...`;

		cardsRow.append(card);
		card.append(article);
		article.append(moviePoster, cardBody);
		cardBody.append(movieTitle, movieDesc);
	});
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

// --- FEEDBACK MESSAGE
const showSearchMessages = ({results}, movieTitle) => {
	searchFeedbackMsg.innerHTML = "";
	const searchMsg = document.createElement('h5');

	results.length
	? searchMsg.innerHTML = `We found ${results.length} movies for <i>"${movieTitle}"</i>`
	: searchMsg.innerHTML = `Ups, no movies found for <i>"${movieTitle}"</i>`;

	searchFeedbackMsg.appendChild(searchMsg);
};

// --- PAGINATION ----
const showPagination = ({total_pages}) => {
	// nextLink.classList.remove('invisible');
	// previousLink.classList.remove('invisible');

	for(let i = 0; i < total_pages; i++) {
		const paginationBtn = document.createElement('li');
		const paginationBtnLink = document.createElement('a');
		paginationBtn.className = 'page-item page-item-number';
		paginationBtnLink.innerText = i + 1;
		setAttributes(paginationBtnLink, {'class': 'page-link', 'href': '#'});

		paginationBtn.append(paginationBtnLink);
		nextLink.insertAdjacentElement('beforebegin', paginationBtn);
	}
}

pagination.addEventListener('click', ({ target }) => {
	const pageNumber = target.innerText;

	if(target.className === 'page-link') {
		document.querySelectorAll('.page-item-number').forEach(link => {
			link.classList.remove('active');
		})
		document.querySelectorAll('.page-item-number')[pageNumber - 1].classList.add('active');
		getMoviesData(movies, pageNumber, false);
	}
});

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