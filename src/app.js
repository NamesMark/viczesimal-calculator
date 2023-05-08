import init, { calculate_vicz_expression } from "../dist/assets/rust_viczesimal/pkg/rust_viczesimal.js";


export async function calculate_expression(expression) {
    await init();
    return calculate_vicz_expression(expression);
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('input[type="button"]');
  
    buttons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const action = e.target.dataset.action;
  
        switch (action) {
            case 'calculate':
                const result = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result;
                break;
            case 'calculate+20':
                calculator.display.value += ' + 10'
                const result2 = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result2;
                break;
            case 'calculate-20':
                calculator.display.value += ' - 10'
                const result3 = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result3;
                break;
            case 'calculate*20':
                calculator.display.value += ' * 10'
                const result4 = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result4;
                break;
            case 'calculate/20':
                calculator.display.value += ' / 10'
                const result5 = await calculate_expression(calculator.display.value);
                calculator.resultDisplay.value = result5;
                break;
            default:
                break;
        }
      });
    });
  });