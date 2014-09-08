/**
 * Show the grades! 
 */
(function (document) {
    "use strict";

    /**
     * Add the scorecard element that contains our information
     * @param possible - The total ammount of points that chould have been achived.
     * @param recived - The total ammount of points erned
     * @param available - Total points still available in this marking period
     */
    function add_scorecard_element(possible, recived, available) {

        if (possible !== 0 && recived >= 0) {

            var mainNotecard = document.getElementsByClassName("notecard")[0], addition = mainNotecard.cloneNode(), spacing = document.createElement("br");

            addition.innerHTML = available + " points still available with a current average of " + (Math.round((recived / possible) * 100)) + "%";

            mainNotecard.insertAdjacentElement("afterEnd", spacing);
            spacing.insertAdjacentElement("afterEnd", addition);

        }

    }

    /**
     * Get the score from an element
     * @param element - place to find scores from. Must be a "listroweven" or "listrowodd"
     * @returns - Object with fields recived and total. If recived is NaN, it has not been graded yet (AKA still available) 
     */
    function get_element_score(element) {

        try {

            var children = element.children, recived = children[children.length - 5].innerText.trim(), total = children[children.length - 3].innerText.trim();

            return { // It is valid, so gimmeh the score
                recived: parseInt(recived, 10),
                total: parseInt(total, 10)
            };

        } catch (err) {
            return { recived: 0, total: 0 }; // Error reading, nothing found
        }

    }

    /**
     * Get all of the elements to inspect for scores
     * @returns an array of DOM elements
     */
    function get_all_elements() {

        var elements = [], evenElements = document.getElementsByClassName("listroweven"), oddElements = document.getElementsByClassName("listrowodd");

        function concat(array) { // Hacky fix to add all the dom elements into an []
            for (var a = 0; a < array.length; a++) {
                elements.push(array[a]);
            }
        }

        concat(evenElements); // Add them all in
        concat(oddElements);

        return elements;

    }

    var elements = get_all_elements(); // Code start

    var total = { // Keep track of all of the grades
        possible: 0,
        recived: 0,
        available: 0
    };

    /*
     * Iterate over elements and total their score 
     */
    for (var index in elements) {

        var score = get_element_score(elements[index]);

        if (isNaN(score.recived)) { // See get_element_score for details
            total.available += score.total;
        } else {
            total.possible += score.total;
            total.recived += score.recived;
        }

    }

    add_scorecard_element(total.possible, total.recived, total.available);

})(document);
