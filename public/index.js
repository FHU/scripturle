const letterInputs = document.querySelectorAll("input.letter");
const guessText = document.querySelector(".guess");
const guessInput = document.getElementById("guess");

let word = "";


letterInputs.forEach(input => input.addEventListener("keyup", (e)=> {
    console.log(e.key);

    if(e.key == "Enter") {
        // Submit form?
    }
    else if (e.key == "Shift") {
        //ignore
    }
    else if(e.key === "Backspace") {
        if (word.length > 0 ) {
            word = word.slice(0, -1);
            //guessText.textContent = word;

            if (input.previousElementSibling) {
                input.previousElementSibling.focus();
                input.previousElementSibling.value = "";
            }
        }   
    }
    else {
        if(word.length < 7 ) {
            word += input.value;
            //guessText.textContent = word;
            guessInput.value = word;
            
            if (input.nextElementSibling) {
                e.target.value && input.nextElementSibling.focus();  
            }
        }
    }
}));