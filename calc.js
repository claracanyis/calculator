// Basic mathematic operators
function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

// Calculator operation
function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1,num2);
        case '-':
            return substract(num1,num2);
        case 'x':
            return multiply(num1,num2);
        case '/':
            return divide(num1,num2);
    }
}

// Global variables
let display = document.querySelector("#display");
let buttons = document.querySelector("#buttons");
let number1;
let number2;
let operator;
let calcStep = 'start';

buttons.addEventListener('click', function (event) {
    console.log(event.target.className);
    switch(event.target.className) {
        case 'number':
            if (calcStep == 'num1' || calcStep == 'num2') {
                display.textContent += event.target.textContent;
            } else if (calcStep == 'start') {
                display.textContent = event.target.textContent;
                calcStep = 'num1'
            } else{
                display.textContent = event.target.textContent;
                calcStep = 'num2';
            }
            break;
        case 'operator':
            if (calcStep == 'num1' || calcStep == 'op') {
                number1 = parseInt(display.textContent);
                operator = event.target.textContent;
                console.log(number1);
                console.log(operator);
            } else {
                number2 = parseInt(display.textContent);
                number1 = operate(operator, number1, number2);
                display.textContent = number1;
                operator = event.target.textContent;
            }
            calcStep = 'op';
            break;
        case 'equal':
            if (calcStep == 'num2') {
                number2 = parseInt(display.textContent);
                display.textContent = operate(operator,number1,number2);
                operator = '';
                number1 = parseInt(display.textContent);
                number2 = null;
                calcStep = 'start';
            }
            break;
        case 'clear':
            calcStep = 'start';
            number1 = 0;
            number2 = 0;
            operator = '';
            display.textContent = '';
    }
    console.log(calcStep);
    //console.log('num1: ' + number1 + '; op: ' + operator + '; num2: ' + number2);
})