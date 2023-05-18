use wasm_bindgen::prelude::*;
use wasm_bindgen_test::*;
wasm_bindgen_test_configure!(run_in_browser);

// Add your Viczesimal digits here
static VICZESIMAL: &[char] = &[
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'Á', 'B', 'C', 'Č', 'D', 'Ď', 'E', 'É', 'Ě'
];
static OPERATORS: &[char] = &[
    '+', '-', '*', '/'
];

#[wasm_bindgen]
pub fn vicz_to_dec(vicz: &str) -> i64 {
    let mut decimal = 0;
    let mut is_negative = false;
    let vicz_to_process = if vicz.starts_with('-') {
        is_negative = true;
        &vicz[1..]
    } else {
        vicz
    };

    for (i, c) in vicz_to_process.chars().rev().enumerate() {
        let value = VICZESIMAL.iter().position(|&x| x == c).unwrap() as i64;
        decimal += value * 20i64.pow(i as u32);
    }

    if is_negative {
        -decimal
    } else {
        decimal
    }
}

#[wasm_bindgen]
pub fn dec_to_vicz(decimal: i64) -> String {
    let mut vicz = String::new();
    let mut remainder = decimal.abs();

    while remainder >= 20 {
        let value = VICZESIMAL[(remainder % 20) as usize];
        vicz.insert(0, value);
        remainder /= 20;
    }

    vicz.insert(0, VICZESIMAL[remainder as usize]);
    if decimal < 0 {
        vicz.insert(0, '-');
    }
    vicz
}

pub fn shunting_yard(_expression: &str) {
    _
}

#[wasm_bindgen]
pub fn calculate_vicz_expression(expression: &str) -> String {
    let mut result = 0i64;
    let mut operator = '+';
    let mut number = String::new();
    
    let expression = expression.replace(" ", "");

    if expression.is_empty() {
        return "0".to_string();
    }

    if !expression.contains(|c| OPERATORS.contains(&c)) {
        return expression.to_string();
    }

    for c in expression.chars() {
        if VICZESIMAL.contains(&c) { 
            number.push(c);
             // log number:
            println!("number pushed: {}", number);
        } else {
            let value = vicz_to_dec(&number) as i64;
            number.clear(); 

            match operator {
                '+' => result += value,
                '-' => result -= value,
                '*' => result *= value, 
                '/' =>  if value == 0 { 
                            return "bruh".to_string();
                        } 
                        else {
                            result /= value;
                        },
                _ => panic!("Unknown operator: {}", operator)
            }

            operator = c;
        }
    }

    let value = vicz_to_dec(&number) as i64;
    println!("value: {}", value);
    match operator {
        '+' => result += value,
        '-' => result -= value,
        '*' => result *= value,
        '/' =>  if value == 0 { 
            return "bruh".to_string();
        } 
        else {
            result /= value;
        },
        _ => panic!("Unknown operator: {}", operator)
    }

    dec_to_vicz(result)
}


#[cfg(test)]
mod tests {
    use super::*;

    #[wasm_bindgen_test]
    fn test_dec_to_vicz() {
        assert_eq!(dec_to_vicz(0), "0");
        assert_eq!(dec_to_vicz(14), "Č");
        assert_eq!(dec_to_vicz(-1), "-1");
        assert_eq!(dec_to_vicz(42), "22");
        assert_eq!(dec_to_vicz(255), "BD");
    }

    #[wasm_bindgen_test]
    fn test_vicz_to_dec() {
        assert_eq!(vicz_to_dec("0"), 0);
        assert_eq!(vicz_to_dec("-1"), -1);
        assert_eq!(vicz_to_dec("Č"), 14);
        assert_eq!(vicz_to_dec("22"), 42);
        assert_eq!(vicz_to_dec("C5"), 265);
    }

    #[wasm_bindgen_test]
    fn test_calculate_expression() {
        assert_eq!(calculate_vicz_expression(""), "0");
        assert_eq!(calculate_vicz_expression("0"), "0");
        assert_eq!(calculate_vicz_expression("1"), "1");
        assert_eq!(calculate_vicz_expression("1/0"), "bruh");
        assert_eq!(calculate_vicz_expression("1+1"), "2");
        assert_eq!(calculate_vicz_expression("Č"), "Č");
        assert_eq!(calculate_vicz_expression("Č"), dec_to_vicz(14));
        assert_eq!(calculate_vicz_expression("Č+Č"), dec_to_vicz(28));
        assert_eq!(calculate_vicz_expression("Č + Č"), dec_to_vicz(28));
        assert_eq!(calculate_vicz_expression("-2"), "-2");
    }
}