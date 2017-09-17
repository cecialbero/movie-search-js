//selects the DOM elements
var item = document.querySelector(".movie-thumbnail");
var title = item.querySelector("h4");
var category = item.querySelector("h5");
var plot = item.querySelector("p");
var image = item.querySelector("img");
var itemList = document.getElementById("item-list");
var counterItem = document.getElementById("counter");

//Ajax Request
function ajaxRequest(method, url, callback) {
	var hrx = new XMLHttpRequest();
	hrx.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(this.responseText));
		}
	}
	hrx.open(method, url, true);
	hrx.send();
};

//Search by select tag
var links = document.querySelectorAll('.category-link');
links.forEach(function(link){
	link.addEventListener('click', function(e){
			e.preventDefault();
			ajaxRequest('GET', 'data.json', categoryRender);

			function categoryRender(response){
				itemList.innerHTML = "";
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
					}
				};
			}
	});
});

//counter
var counter = 0;
function createsCounter(searchItem) {
	counter = counter + 1;
	if(counter == 1) {
		counterItem.innerHTML = "We found " + counter + " result for " + '"' +  searchItem + '"';
	}
	else {
		counterItem.innerHTML = "We found " + counter + " results for " + '"' + searchItem + '"';
	}
}

function searchByCategory(movieCategory) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var i;
			itemList.innerHTML = "";
			counter = 0;

			for(i = 0; i < response.length; i++) {
				var movie = response[i];
				var itemCategory = movie.category;

				if(itemCategory == movieCategory) {
					createsCounter(movieCategory);

					//inserts the information inside the selected elements
					title.innerHTML = movie.film;
					category.innerHTML = itemCategory;
					var moviePlot = movie.plot.substring(0, 100);
					plot.innerHTML = moviePlot + "...";
					image.setAttribute("src", movie.image.url);
					image.setAttribute("alt", movie.image.alt);

					//clones the thumbnail element
					var cloneItem = item.cloneNode(true);
					cloneItem.classList.add("show");
					cloneItem.classList.remove("hide");
					itemList.appendChild(cloneItem);
				}
			}
		}
	};
	httpRequest.open('GET','data.json',true);
	httpRequest.send();
};

//search by film name on the search box
function searchByFilm() {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);

			var userData = document.getElementById("search-film").value;
			itemList.innerHTML = "";
			counter = 0;
			counterItem.innerHTML = "There are no results for " + '"' + userData + '"';
			if(userData == "") {
				counterItem.innerHTML = "";
			}

			//search the movie titles at the json
			for(var j = 0; j < response.length; j++) {
				var movie = response[j];
				var movieTitle = movie.film;

				var regexp = new RegExp(userData, "gi");
				var wordSearch = movieTitle.search(regexp);

				if(wordSearch != -1 && userData != false) {
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

					createsCounter(userData);
				}
			}
		}
	};
	httpRequest.open('GET','data.json',true);
	httpRequest.send();
};

var searchFilm = document.getElementById("search-film");
searchFilm.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    	e.preventDefault();
    	searchByFilm();
    }
});
