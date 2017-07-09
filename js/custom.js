function searchByCategory(movieCategory) {	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var i;
			var counter = 0;
			var filmList = document.getElementById("filmList");
			//erases any possible data inside the filmList element
			filmList.innerHTML = "";				

			for(i = 0; i < response.length; i++) {
				var movie = response[i];
				var itemCategory = movie.category;

				//selects the DOM elements
				var item = document.querySelector(".movie-thumbnail");
				var title = item.querySelector("h3");
				var category = item.querySelector("h4");
				var plot = item.querySelector("p");
				var image = item.querySelector("img");		

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
					var itemList = document.getElementById("item-list");
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

			var filmList = document.getElementById("filmList");
			//erases any possible data inside the filmList element
			filmList.innerHTML = "";

			for(var j = 0; j < response.length; j++) {
				var movies = response[j];
				var movieTitle = movies.film;
				movieTitle = movieTitle.toLowerCase();
				for(var k = 0; k < userData.length; k++) {
					var wordSearch = movieTitle.search(userData[k]);
					if(wordSearch != -1) {

						//creates the DOM elements			
						var $item = document.createElement("article");
						var $title = document.createElement("h2");
						var $category = document.createElement("i");		
						var $duration = document.createElement("p");
						var $plot = document.createElement("p");
						var $image = document.createElement("img");
						var $description = document.createElement("div");

						//inserts the information inside the created elements
						$title.innerHTML = movies.film;
						$duration.innerHTML = "Duration: " + movies.duration;
						$category.innerHTML = movies.category;
						$plot.innerHTML = movies.plot;
						$image.setAttribute("src", movies.image.url);
						$image.setAttribute("alt", movies.image.alt);
						$description.setAttribute("class", "description");

						//appends the created elements into de DOM
						$description.appendChild($title);
						$description.appendChild($category);
						$description.appendChild($duration);
						$description.appendChild($plot);
						$item.appendChild($image);
						$item.appendChild($description);
						filmList.appendChild($item);

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

//Paginador
//Obj: contar cuando elementos, mostrar solo 3. Los otros colocarlos en segundo div