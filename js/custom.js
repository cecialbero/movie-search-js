function searchCartoon() {	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		var i;
		var counter = 0;
		for(i = 0; i < response.length; i++) {
			var movie = response[i];
			var category = movie.category;
			if(category == "cartoon") {
				counter = counter + 1;
				var result = document.getElementById("result");
				var $item = document.createElement("li");
				var $category = document.createElement("i");
				var $title = document.createElement("h3");
				var $duration = document.createElement("p");
				var $image = document.createElement("img");
				var $description = document.createElement("div");
				$description.setAttribute("class", "description");
				$category.innerHTML = category;
				$title.innerHTML = movie.film;
				$duration.innerHTML = "Duration: " + movie.duration;
				$image.setAttribute("src", movie.image.url);
				$image.setAttribute("alt", movie.image.alt);
				result.appendChild($item);
				$description.appendChild($category);
				$description.appendChild($title);
				$description.appendChild($duration);
				$item.appendChild($image);
				$item.appendChild($description);
				console.log(counter);
			}
		}
	}
	};
	httpRequest.open('GET','data.json',true);
	httpRequest.send();
};