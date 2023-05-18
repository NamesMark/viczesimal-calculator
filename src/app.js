import init, { calculate_vicz_expression } from "../src/rust_viczesimal/pkg/rust_viczesimal.js";


export async function calculate_expression(expression) {
    await init();
    return calculate_vicz_expression(expression);
}

const errorDisplay = document.getElementById('errorDisplay');

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('input[type="button"]');

    let previousExpression = '';
    let previousResult = '';
  
    buttons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const action = e.target.dataset.action;
        errorDisplay.innerHTML = " ";

        switch (action) {
            case 'calculate':
                let currentExpression = calculator.display.value;
                let lastOperator = "";
                if (currentExpression.match(/[-+*/]/g) != null) {
                    lastOperator = currentExpression.match(/[-+*/]/g).pop();
                    let lastNumber = currentExpression.split(lastOperator).pop();
                    if (currentExpression == previousExpression) {
                        calculator.display.value = previousResult + " " + lastOperator + lastNumber;
                    }
                }   
                const result = await calculate_expression(calculator.display.value);
                if (result == 'bruh') {
                    calculator.display.value = "";
                    errorDisplay.innerHTML = "Bruh, can't do me like that with division by zero.";
                    calculator.resultDisplay.value = "";
                    break;
                }
                calculator.resultDisplay.value = result;
                previousExpression = calculator.display.value;
                previousResult = result;
                break;
            case 'calculate+20':
                calculator.display.value += ' + 10'
                const result2 = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result2;
                previousExpression = calculator.display.value;
                previousResult = result2;
                break;
            case 'calculate-20':
                calculator.display.value += ' - 10'
                const result3 = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result3;
                previousExpression = calculator.display.value;
                previousResult = result3;
                break;
            case 'calculate*20':
                calculator.display.value += ' * 10'
                const result4 = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result4;
                previousExpression = calculator.display.value;
                previousResult = result4;
                break;
            case 'calculate/20':
                calculator.display.value += ' / 10'
                const result5 = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result5;
                previousExpression = calculator.display.value;
                previousResult = result5;
                break;
            default:
                break;
        }
      });
    });
  });