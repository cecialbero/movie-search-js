//selects the DOM elements
var item = document.querySelector(".movie-thumbnail");
var title = item.querySelector("h4");
var category = item.querySelector("h5");
var plot = item.querySelector("p");
var image = item.querySelector("img");
var itemList = document.getElementById("item-list");
var counterItem = document.getElementById("counter");

//Counter
var counter = 0;
function Counter(searchItem) {
	counter = counter + 1;
	if(counter == 1) {
		counterItem.innerHTML = "We found " + counter + " result for " + '"' +  searchItem + '"';
	}
	else {
		counterItem.innerHTML = "We found " + counter + " results for " + '"' + searchItem + '"';
	}
}

//Ajax Request
function AjaxRequest(method, url, callback) {
	var hrx = new XMLHttpRequest();
	hrx.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(this.responseText));
		}
	}
	hrx.open(method, url, true);
	hrx.send();
};

//Search by Search by category select
var links = document.querySelectorAll('.category-link');
links.forEach(function(link){
	link.addEventListener('click', function(e){
			e.preventDefault();
			AjaxRequest('GET', 'data.json', CategoryRender);

			function CategoryRender(response){
				itemList.innerHTML = "";
				counter = 0;
				for(var i = 0; i < response.length; i++){
					var movie = response[i];
					if(movie.category == link.text.toLowerCase()) {
						//inserts the information inside the selected elements
						title.innerHTML = movie.film;
						category.innerHTML = movie.category.toUpperCase();
						var moviePlot = movie.plot.substring(0, 100);
						plot.innerHTML = moviePlot + "...";
						image.setAttribute("src", movie.image.url);
						image.setAttribute("alt", movie.image.alt);

						//clones the thumbnail element
						var cloneItem = item.cloneNode(true);
						cloneItem.classList.add("show");
						cloneItem.classList.remove("hide");
						itemList.appendChild(cloneItem);

						Counter(link.text);
					}
				}
			}
	});
});


//search by film name on the search box
var searchBtn = document.querySelector('#search-film button');
var userData = document.querySelector("#search-film input");

searchBtn.addEventListener('click', function(){
	AjaxRequest('GET', 'data.json', SearchRender);
}, true);

function SearchRender(response) {

	itemList.innerHTML = "";
	counter = 0;
	counterItem.innerHTML = "There are no results for " + '"' + userData.value + '"';
	if(userData.value == "") {
		counterItem.innerHTML = "";
	}

	//search the movie titles at the json
	for(var j = 0; j < response.length; j++) {
		var movie = response[j];
		var movieTitle = movie.film;

		var regexp = new RegExp(userData.value, "gi");
		var wordSearch = movieTitle.search(regexp);

		if(wordSearch != -1 && userData.value != false) {
			//inserts the information inside the selected elements
			title.innerHTML = movie.film;
			category.innerHTML = movie.category;
			plot.innerHTML = movie.plot;
			image.setAttribute("src", movie.image.url);
			image.setAttribute("alt", movie.image.alt);

			//clones the thumbnail element
			var cloneItem = item.cloneNode(true);
			cloneItem.classList.add("show");
			cloneItem.classList.remove("hide");
			itemList = document.getElementById("item-list");
			itemList.appendChild(cloneItem);

			Counter(userData.value);
		}
	}
};

userData.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    	e.preventDefault();
    	AjaxRequest('GET', 'data.json', SearchRender);
    }
});
