const letterInputs = document.querySelectorAll("input.letter");
const guessText = document.querySelector(".guess");
const guessInput = document.getElementById("guess");

let word = "";
let count = 0;

letterInputs.forEach(input => input.addEventListener("keyup", (e) => {
    // console.log(e.key);

    if (e.key == "Enter") {
        // Submit form?
    }
    else if (e.key === "Backspace") {
        // delete last letter from form and box
        if (count > 0) {
            if (count == 7) {
                input.value = ""; // current box gets empty
                word = word.slice(0, -1); // delete last letter from word
                guessInput.value = word; // form gets word minus last letter
                count--;

                console.log(word, count);
            }
            else {
                input.previousElementSibling.value = ""; // current box gets empty
                word = word.slice(0, -1); // delete last letter from word
                guessInput.value = word; // form gets word minus last letter
                count--;

                console.log(word, count);

                // go to previous box if available
                if (input.previousElementSibling) {
                    input.previousElementSibling.focus();
                }
            }
        }
    }
    else {
        // add letter to form and box
        if (count < 7 && e.keyCode >= 65 && e.keyCode <= 90) {
            input.value = e.key; // box gets letter
            word += e.key; // word gets letter
            guessInput.value = word; // form gets word with new
            count++;

            console.log(word, count, e.keyCode);

            // go to next box if available
            if (input.nextElementSibling) {
                input.nextElementSibling.focus();
            }
        }
    }
}));