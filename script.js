var c;
var ctx;
var selected;

// To select algorithm
function selectAlgo(btn) {
    selected = btn.value;
    console.log(selected);
    $('.algorithm-input .btn-group button').removeClass('active');
    btn.classList.add('active');
}

function Calculate() {
    //Reset old canvas height, so it wont increase every time
    c = document.getElementById("canvas");
    c.height = 60;
    //Reset result
    showResult("");

    let errorMessage = document.getElementById('errorMessage');
    hideError(errorMessage);

    // Get data from inputs
    let inputNumbersString = document.getElementById('inputNumbers').value;
    let inputNumbers = inputNumbersString.split(" ");
    let inputHeadPos = document.getElementById('inputHeadPos').value;

    //Remove header values from input
    for (let i = 0; i < inputNumbers.length; i++) {
        if (inputNumbers[i] == inputHeadPos) {
            inputNumbers.splice(i, 1);
        }
    }
    inputNumbers.unshift(inputHeadPos);

    //Remove dublicates
    inputNumbers = inputNumbers.filter(function(item, pos) {
        return inputNumbers.indexOf(item) == pos;
    });

    let inputAlgorithm = selected;

    // Validation
    let isValidInput = true;
    if (!isAlgorithmSelected()) {
        showError(errorMessage, "Algorithm not selected");
        isValidInput = false;
    } else if (inputHeadPos == "") {
        showError(errorMessage, "Please Enter Current Head Position");
        isValidInput = false;
    } else if (isNaN(inputHeadPos)) {
        showError(errorMessage, "Only Numeric Value Allowed for Current Head Position!!!");
        isValidInput = false;
    } else if (parseInt(inputHeadPos) < 0 || parseInt(inputHeadPos) > 199) {
        showError(errorMessage, "Current Head position Value Must be in Between 1-199");
        isValidInput = false;
    } else if (inputNumbersString == "") {
        showError(errorMessage, "Numeric value required for Queue");
        isValidInput = false;
    } else {
        inputNumbers.forEach(number => {
            if (isNaN(number)) {
                showError(errorMessage, "Number queue must be made of numbers");
                isValidInput = false;
            } else if (parseInt(number) < 0 || parseInt(number) > 199) {
                showError(errorMessage, "Number queue values must be in range 1..199");
                isValidInput = false;
            }
        });
    }
    if (isValidInput) {
        drawCanvas(inputNumbers)
    }
}

// To algorithm is select or not
function isAlgorithmSelected() {
    let validInputs = ["fcfs", "sstf", "scan", "look"];
    return validInputs.indexOf(selected) > -1;
}

function showError(errorMessage, msg) {
    errorMessage.classList.add('alert');
    errorMessage.classList.add('alert-danger');
    errorMessage.innerHTML = msg;
}

function hideError(errorMessage) {
    errorMessage.classList.remove('alert');
    errorMessage.classList.remove('alert-danger');
    errorMessage.innerHTML = "";
}


// Helper functions
function getNumberLenght(num) {
    return Math.ceil(Math.log10(num + 1));
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}