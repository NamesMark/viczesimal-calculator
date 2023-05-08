use wasm_bindgen::prelude::*;

// Add your Viczesimal digits here
static VICZESIMAL: &[char] = &[
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'Á', 'B', 'C', 'Č', 'D', 'Ď', 'E', 'É', 'Ě'
];

#[wasm_bindgen]
pub fn vicz_to_dec(vicz: &str) -> u32 {
    let mut decimal = 0;
    for (i, c) in vicz.chars().rev().enumerate() {
        let value = VICZESIMAL.iter().position(|&x| x == c).unwrap() as u32;
        decimal += value * 20u32.pow(i as u32);
    }
    decimal
}

#[wasm_bindgen]
pub fn dec_to_vicz(decimal: u32) -> String {
    let mut vicz = String::new();
    let mut remainder = decimal;

    while remainder >= 20 {
        let value = VICZESIMAL[(remainder % 20) as usize];
        vicz.insert(0, value);
        remainder /= 20;
    }

    vicz.insert(0, VICZESIMAL[remainder as usize]);
    vicz
}

#[wasm_bindgen]
pub fn calculate_vicz_expression(expression: &str) -> String {
    let mut result = 0;
    let mut operator = '+';
    let mut number = String::new();
    
    let expression = expression.replace(" ", "");

    for c in expression.chars() {
        if VICZESIMAL.contains(&c) { 
            number.push(c);
        } else {
            let value = vicz_to_dec(&number);
            number.clear(); 

            match operator {
                '+' => result += value,
                '-' => result -= value,
                '*' => result *= value, 
                '/' => result /= value,
                _ => panic!("Unknown operator: {}", operator)
            }

            operator = c;
        }
    }

    let value = vicz_to_dec(&number);
    match operator {
        '+' => result += value,
        '-' => result -= value,
        '*' => result *= value,
        '/' => result /= value,
        _ => panic!("Unknown operator: {}", operator)
    }

    dec_to_vicz(result)
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_dec_to_vicz() {
        assert_eq!(dec_to_vicz(42), "22");
        assert_eq!(dec_to_vicz(255), "BD");
        // Add more test cases as needed
    }

    #[test]
    fn test_vicz_to_dec() {
        assert_eq!(vicz_to_dec("22"), 42);
        assert_eq!(vicz_to_dec("C5"), 265);
        // Add more test cases as needed
    }

    #[test]
    fn test_calculate_expression() {
        assert_eq!(calculate_vicz_expression("1+1"), "2");
        assert_eq!(calculate_vicz_expression("Č"), dec_to_vicz(14));
        assert_eq!(calculate_vicz_expression(""), "0");
        assert_eq!(calculate_vicz_expression("Č+Č"), dec_to_vicz(28));
        assert_eq!(calculate_vicz_expression("Č + Č"), dec_to_vicz(28));
    }
}