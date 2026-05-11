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
            if (num2 == 0) {return 'ERROR'}
            let result = divide(num1,num2);
            if (result.toString().length > 14) {
                console.log(result.toString().slice(0,15))
                return result.toString().slice(0,15);
            }
            return result;
    }
}

// Global variables
let display = document.querySelector("#display");
let buttons = document.querySelector("#buttons");
let dot = document.querySelector('#decimal');
let number1 = 0;
let number2;
let operator;
let calcStep = 'start';

buttons.addEventListener('click', function (event) {
    switch(event.target.className) {
        case 'number':
            if (event.target.id == 'decimal') {
                dot.disabled = true;
            }
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
            if (calcStep == 'num1' || calcStep == 'op' || calcStep == 'start') {
                number1 = parseFloat(display.textContent);
                operator = event.target.textContent;
            } else {
                number2 = parseFloat(display.textContent);
                number1 = operate(operator, number1, number2);
                display.textContent = number1;
                operator = event.target.textContent;
            }
            dot.disabled = false;
            calcStep = 'op';
            break;
        case 'equal':
            if (calcStep == 'num2') {
                number2 = parseFloat(display.textContent);
                display.textContent = operate(operator,number1,number2);
                operator = '';
                number1 = parseInt(display.textContent);
                number2 = null;
                dot.disabled = false;
                calcStep = 'start';
            }
            break;
        case 'clear':
            if (event.target.id == 'delete') {
                if (display.textContent.slice(-1) == '.') {
                    dot.disabled = false;
                }
                display.textContent = display.textContent.slice(0,-1);
            } else {
                calcStep = 'start';
                dot.disabled = false;
                number1 = 0;
                number2 = 0;
                operator = '';
                display.textContent = '0';
            }
            
    }

})