function searchMovie(movieCategory) {	
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
				var category = movie.category;

				//creates the DOM elements			
				var $item = document.createElement("article");
				var $title = document.createElement("h4");
				var $category = document.createElement("i");		
				var $duration = document.createElement("p");
				var $plot = document.createElement("p");
				var $image = document.createElement("img");
				var $description = document.createElement("div");			

				if(category == movieCategory) {
					//creates a counter
					counter = counter + 1;
					var counterItem = document.getElementById("counter");
					counterItem.innerHTML = "We found " + counter + " results for " + movieCategory;

					//inserts the information inside the created elements
					$title.innerHTML = movie.film;
					$duration.innerHTML = "Duration: " + movie.duration;
					$category.innerHTML = category;
					$plot.innerHTML = movie.plot;
					$image.setAttribute("src", movie.image.url);
					$image.setAttribute("alt", movie.image.alt);
					$description.setAttribute("class", "description");

					//appends the created elements into de DOM
					$description.appendChild($title);
					$description.appendChild($category);
					$description.appendChild($duration);
					$description.appendChild($plot);
					$item.appendChild($image);
					$item.appendChild($description);
					filmList.appendChild($item);					
				}
			}
		}
	};
	httpRequest.open('GET','data.json',true);
	httpRequest.send();
};

//OBJETIVES
// show only 5 results and create a pagination
