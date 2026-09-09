console.log(`Інструкція з використання функції triangle():
Функція розв'язує прямокутний трикутник за двома елементами.
Синтаксис: triangle(val1, type1, val2, type2)
Можливі типи ("type"):"leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"`);

function triangle(val1, type1, val2, type2) {
    // Допоміжна функція для переведення градусів у радіани
    const rad = (deg) => deg * (Math.PI / 180);
    // Перевірка на від'ємні чи нульові значення
    if (val1 <= 0 || val2 <= 0) {
        return "Змінні повинні бути більшими за нуль";
    }
    let a, b, c, alpha, beta;
    // 1. Два катети
    if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = Math.atan(a / b) * (180 / Math.PI);
        beta = 90 - alpha;
    }
    // 2. Катет і гіпотенуза
    else if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        if (type1 === "leg") { a = val1; c = val2; } 
        else { a = val2; c = val1; }
        if (a >= c) 
            return "Катет не може бути більшим або рівним гіпотенузі";
        b = Math.sqrt(c * c - a * a);
        alpha = Math.asin(a / c) * (180 / Math.PI);
        beta = 90 - alpha;
    }
    // 3. Катет і прилеглий кут
    else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        if (type1 === "leg") { a = val1; beta = val2; } 
        else { a = val2; beta = val1; }
        if (beta <= 0 || beta >= 90) 
            return "Кут повинен бути гострим (від 0 до 90 градусів)";
        alpha = 90 - beta;
        b = a * Math.tan(rad(beta));
        c = a / Math.cos(rad(beta));
    }
    // 4. Катет і протилежний кут
    else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        if (type1 === "leg") { a = val1; alpha = val2; } 
        else { a = val2; alpha = val1; }
        if (alpha <= 0 || alpha >= 90)
            return "Кут повинен бути гострим (від 0 до 90 градусів)";
        beta = 90 - alpha;
        b = a / Math.tan(rad(alpha));
        c = a / Math.sin(rad(alpha));
    }
    // 5. Гіпотенуза і гострий кут
    else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        if (type1 === "hypotenuse") { c = val1; alpha = val2; } 
        else { c = val2; alpha = val1; }
        if (alpha <= 0 || alpha >= 90) 
            return "Кут повинен бути гострим (від 0 до 90 градусів)";
        beta = 90 - alpha;
        a = c * Math.sin(rad(alpha));
        b = c * Math.cos(rad(alpha));
    }
    // Якщо типи помилкові або несумісні
    else {
        console.log("Перечитайте інструкцію.");
        return "failed";
    }
    // Виведення результату
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);
    return "success";
}
