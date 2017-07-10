//selects the DOM elements
var item = document.querySelector(".movie-thumbnail");
var title = item.querySelector("h3");
var category = item.querySelector("h4");
var plot = item.querySelector("p");
var image = item.querySelector("img");

function searchByCategory(movieCategory) {	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var i;
			var counter = 0;
			var itemList = document.getElementById("item-list");
			//var newItems = document.querySelector(".show");	
			//newItems.parentNode.removeChild(newItems);

			for(i = 0; i < response.length; i++) {
				var movie = response[i];
				var itemCategory = movie.category;		

				if(itemCategory == movieCategory) {
					//creates a counter
					counter = counter + 1;
					var counterItem = document.getElementById("counter");
					counterItem.innerHTML = "We found " + counter + " results for " + movieCategory;

					//inserts the information inside the selected elements
					title.innerHTML = movie.film;
					category.innerHTML = itemCategory;
					plot.innerHTML = movie.plot;
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

//search by film name on the search fiel
function searchByFilm() {	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);

			var userData = document.getElementById("search-film").value;
			var counterItem = document.getElementById("counter");
			counterItem.innerHTML = "";
			userData = userData.toLowerCase();
			userData = userData.split(" ");		

			var eraseThe = 'the';
			var eraseOf = 'of';
			for (var i=userData.length-1; i>=0; i--) {
			    if (userData[i] === eraseThe || userData[i] === eraseOf) {
			        userData.splice(i, 1);
			    }
			}


			for(var j = 0; j < response.length; j++) {
				var movie = response[j];
				var movieTitle = movie.film;
				movieTitle = movieTitle.toLowerCase();
				for(var k = 0; k < userData.length; k++) {
					var wordSearch = movieTitle.search(userData[k]);
					if(wordSearch != -1) {

						//inserts the information inside the selected elements
						title.innerHTML = movie.film;
						category.innerHTML = movie.category;
						plot.innerHTML = movie.plot;
						console.log(plot.length);
						image.setAttribute("src", movie.image.url);
						image.setAttribute("alt", movie.image.alt);

						//clones the thumbnail element	
						var cloneItem = item.cloneNode(true);
						cloneItem.classList.add("show");
						cloneItem.classList.remove("hide");
						var itemList = document.getElementById("item-list");
						itemList.appendChild(cloneItem);

						var counter = 0;
						//creates a counter
						counter = counter + 1;
						counterItem.innerHTML = "We found " + counter + " results for " + userData;
					}
				}
			}
		}
	};
	httpRequest.open('GET','data.json',true);
	httpRequest.send();
};