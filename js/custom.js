function searchMovie(movieCategory) {	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			var i;
			var counter = 0;
			for(i = 0; i < response.length; i++) {
				var movie = response[i];
				var category = movie.category;

				//select the DOM elements
				var result = document.getElementById('items');				
				var $item = document.querySelector("#items li");
				var $title = document.querySelector("#items h3");
				var $category = document.querySelector("#items i");					
				var $duration = document.querySelector("#items p");
				var $image = document.querySelector("#items img");
				var $description = document.querySelector("#items div");

				if(category == movieCategory) {
					//counter = counter + 1;
					var newItem = $item.cloneNode(true);
					result.appendChild(newItem);
					$item.removeAttribute("id", "templateItem");
					document.getElementById("templateItem").style.display = "none";

					$category.innerHTML = category;
					$title.innerHTML = movie.film;
					$duration.innerHTML = "Duration: " + movie.duration;
					$image.setAttribute("src", movie.image.url);
					$image.setAttribute("alt", movie.image.alt);
					result.style.display = "block";
					/*console.log(counter);
					if(movieCategory == "cartoon") {
						result.setAttribute("class", "cartoon");
						result.removeAttribute("class", "adventure");
					}
					if(movieCategory == "adventure") {
						result.setAttribute("class", "adventure");
						result.removeAttribute("class", "cartoon");
					}*/
				}
			}
		}
	};
	httpRequest.open('GET','data.json',true);
	httpRequest.send();
};

//OBJETIVES

// clear the previous results when clicking on a new button
// cheate a counter a show the number of results next to: "We found x results for x"
