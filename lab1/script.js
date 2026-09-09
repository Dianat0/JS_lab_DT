console.log("Інструкція:");
console.log('triangle(значення1, "тип1", значення2, "тип2")');
console.log('Типи: "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"');
console.log("Кути вводяться у градусах.");

function triangle(value1, type1, value2, type2) {
    // Перевірка на нуль та від'ємні числа
    if (value1 <= 0 || value2 <= 0) {
        return "Zero or negative input";
    }
    let a, b, c;
    let alpha, beta;
    // Переведення градусів у радіани
    function rad(angle) {
        return angle * Math.PI / 180;
    }
    // Переведення радіанів у градуси
    function deg(angle) {
        return angle * 180 / Math.PI;
    }
    // 1. Два катети
    if (type1 == "leg" && type2 == "leg") {
        a = value1;
        b = value2;
        c = Math.sqrt(a * a + b * b);
        alpha = deg(Math.atan(a / b));
        beta = 90 - alpha;
    }
    // 2. Катет і гіпотенуза
    else if (
        (type1 == "leg" && type2 == "hypotenuse") ||
        (type1 == "hypotenuse" && type2 == "leg")
    ) {
        if (type1 == "leg") {
            a = value1;
            c = value2;
        } else {
            c = value1;
            a = value2;
        }
        if (a >= c) {
            return "Leg must be smaller than hypotenuse";
        }
        b = Math.sqrt(c * c - a * a);
        alpha = deg(Math.asin(a / c));
        beta = 90 - alpha;
    }
    // 3. Гіпотенуза і кут
    else if (
        (type1 == "hypotenuse" && type2 == "angle") ||
        (type1 == "angle" && type2 == "hypotenuse")
    ) {
        if (type1 == "hypotenuse") {
            c = value1;
            alpha = value2;
        } else {
            c = value2;
            alpha = value1;
        }
        if (alpha <= 0 || alpha >= 90) {
            return "Angle must be between 0 and 90 degrees";
        }
        beta = 90 - alpha;
        a = c * Math.sin(rad(alpha));
        b = c * Math.cos(rad(alpha));
    }
    // 4. Катет і прилеглий кут
    else if (
        (type1 == "leg" && type2 == "adjacent angle") ||
        (type1 == "adjacent angle" && type2 == "leg")
    ) {
        if (type1 == "leg") {
            a = value1;
            beta = value2;
        } else {
            a = value2;
            beta = value1;
        }
        if (beta <= 0 || beta >= 90) {
            return "Angle must be between 0 and 90 degrees";
        }
        alpha = 90 - beta;
        b = a / Math.tan(rad(beta));
        c = a / Math.sin(rad(alpha));
    }
    // 5. Катет і протилежний кут
    else if (
        (type1 == "leg" && type2 == "opposite angle") ||
        (type1 == "opposite angle" && type2 == "leg")
    ) {
        if (type1 == "leg") {
            a = value1;
            alpha = value2;
        } else {
            a = value2;
            alpha = value1;
        }
        if (alpha <= 0 || alpha >= 90) {
            return "Angle must be between 0 and 90 degrees";
        }
        beta = 90 - alpha;
        b = a / Math.tan(rad(alpha));
        c = a / Math.sin(rad(alpha));
    }
    // Якщо типи неправильні або несумісні
    else {
        console.log("Перечитайте інструкцію.");
        return "failed";
    }
    // Виведення результату
    console.log("a =", a);
    console.log("b =", b);
    console.log("c =", c);
    console.log("alpha =", alpha);
    console.log("beta =", beta);
    return "success";
}
