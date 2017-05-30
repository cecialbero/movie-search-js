function searchCartoon() {	
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		var response = JSON.parse(this.responseText);
		var i;
		for(i = 0; i < response.length; i++) {
			var movie = response[i];
			var category = movie.category;
			if(category == "cartoon") {
				var $category = document.createElement("i");
				var $title = document.createElement("h2");
				var box = document.getElementById('box');
				$category.innerHTML = category;
				$title.innerHTML = movie.film;
				box.appendChild($category);
				box.appendChild($title);
			}
		}
	}
	};
	httpRequest.open('GET','data.json',true);
	httpRequest.send();
};