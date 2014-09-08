(function (document) {
	var elements = get_all_elements();
	
	var total = {
		possible: 0,
		recived: 0,
		available: 0
	};
	
	for (var index in elements) {
	
		var score = get_element_score(elements[index]);
		
		if (isNaN(score.recived)) {
			total.available += score.total;
		} else {
			total.possible += score.total;
			total.recived += score.recived;
		}
	
	}
	
	add_scorecard_element(total.possible, total.recived, total.available);
	
	function add_scorecard_element(possible, recived, available) {
	
		var mainNotecard = document.getElementsByClassName("notecard")[0];
		var addition = mainNotecard.cloneNode();
		var spacing = document.createElement("br");

		addition.innerHTML = available + " points still available with a current average of " + (Math.round((recived / possible) * 100)) + "%";

		mainNotecard.insertAdjacentElement("afterEnd", spacing);
		spacing.insertAdjacentElement("afterEnd", addition);
	}
	
	function get_element_score(element) {
		console.log(element);
		var children = element.children;
		var recived = children[children.length - 5].innerText.trim();
		var total = children[children.length - 3].innerText.trim();
		return {
			recived: parseInt(recived),
			total: parseInt(total)
		};
	
	}
	
	function get_all_elements() {
		var evenElements = document.getElementsByClassName("listroweven");
		var oddElements = document.getElementsByClassName("listrowodd");
		var elements = [];
		
		var concat = function (array) {
			for (var a = 0; a < array.length; a++) {
				elements.push(array[a]);
			}
		};

		concat(evenElements);
		concat(oddElements);

		return elements;
	}

})(document);
