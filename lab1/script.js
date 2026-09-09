console.log("ІНСТРУКЦІЯ:");
console.log("triangle(значення1, тип1, значення2, тип2)");
console.log("Можливі типи: leg, hypotenuse, adjacent angle, opposite angle, angle");
console.log("Кути потрібно вводити у градусах.");
console.log("Приклади:");
console.log('triangle(4, "leg", 8, "hypotenuse")');
console.log('triangle(8, "hypotenuse", 4, "leg")');
console.log('triangle(30, "angle", 10, "hypotenuse")');

function triangle(value1, type1, value2, type2) {

    // Перевірка типів
    let types = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if (!types.includes(type1) || !types.includes(type2)) {
        console.log("Неправильний тип. Перечитайте інструкцію.");
        return "failed";
    }

    // Перевірка чисел
    if (typeof value1 !== "number" || typeof value2 !== "number" ||
        value1 <= 0 || value2 <= 0) {
        return "Некоректні значення: числа повинні бути більшими за 0";
    }

    let a, b, c;
    let alpha, beta;

    // Переведення градусів у радіани
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    // Переведення радіанів у градуси
    function toDegrees(radians) {
        return radians * 180 / Math.PI;
    }

    // --------------------------------------------------
    // 1. ДВА КАТЕТИ
    // --------------------------------------------------
    if (type1 == "leg" && type2 == "leg") {

        a = value1;
        b = value2;

        c = Math.sqrt(a * a + b * b);

        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;
    }

    // --------------------------------------------------
    // 2. КАТЕТ + ГІПОТЕНУЗА
    // --------------------------------------------------
    else if (type1 == "leg" && type2 == "hypotenuse" ||
             type1 == "hypotenuse" && type2 == "leg") {

        if (type1 == "leg") {
            a = value1;
            c = value2;
        } else {
            c = value1;
            a = value2;
        }

        if (a >= c) {
            return "Некоректні значення: катет не може бути більшим або рівним гіпотенузі";
        }

        b = Math.sqrt(c * c - a * a);

        alpha = toDegrees(Math.asin(a / c));
        beta = 90 - alpha;
    }

    // --------------------------------------------------
    // 3. ГІПОТЕНУЗА + КУТ
    // --------------------------------------------------
    else if (type1 == "hypotenuse" && type2 == "angle" ||
             type1 == "angle" && type2 == "hypotenuse") {

        if (type1 == "hypotenuse") {
            c = value1;
            alpha = value2;
        } else {
            c = value2;
            alpha = value1;
        }

        if (alpha <= 0 || alpha >= 90) {
            return "Некоректний кут: гострий кут повинен бути від 0 до 90 градусів";
        }

        beta = 90 - alpha;

        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
    }

    // --------------------------------------------------
    // 4. КАТЕТ + ПРИЛЕГЛИЙ КУТ
    // --------------------------------------------------
    else if (type1 == "leg" && type2 == "adjacent angle" ||
             type1 == "adjacent angle" && type2 == "leg") {

        let leg;
        let angle;

        if (type1 == "leg") {
            leg = value1;
            angle = value2;
        } else {
            leg = value2;
            angle = value1;
        }

        if (angle <= 0 || angle >= 90) {
            return "Некоректний кут: гострий кут повинен бути від 0 до 90 градусів";
        }

        // Вважаємо заданий катет a,
        // а прилеглий до нього кут — beta
        a = leg;
        beta = angle;
        alpha = 90 - beta;

        c = a / Math.sin(toRadians(alpha));
        b = a / Math.tan(toRadians(beta));
    }

    // --------------------------------------------------
    // 5. КАТЕТ + ПРОТИЛЕЖНИЙ КУТ
    // --------------------------------------------------
    else if (type1 == "leg" && type2 == "opposite angle" ||
             type1 == "opposite angle" && type2 == "leg") {

        let leg;
        let angle;

        if (type1 == "leg") {
            leg = value1;
            angle = value2;
        } else {
            leg = value2;
            angle = value1;
        }

        if (angle <= 0 || angle >= 90) {
            return "Некоректний кут: гострий кут повинен бути від 0 до 90 градусів";
        }

        // Вважаємо заданий катет a,
        // а протилежний до нього кут — alpha
        a = leg;
        alpha = angle;
        beta = 90 - alpha;

        c = a / Math.sin(toRadians(alpha));
        b = a / Math.tan(toRadians(alpha));
    }

    // --------------------------------------------------
    // НЕСУМІСНА ПАРА ТИПІВ
    // --------------------------------------------------
    else {
        console.log("Несумісна пара типів. Перечитайте інструкцію.");
        return "failed";
    }

    // Перевірка результатів
    if (a <= 0 || b <= 0 || c <= 0 ||
        alpha <= 0 || alpha >= 90 ||
        beta <= 0 || beta >= 90) {
        return "Некоректні дані";
    }

    // --------------------------------------------------
    // ВИВЕДЕННЯ РЕЗУЛЬТАТУ
    // --------------------------------------------------

    console.log("Результат:");
    console.log("a =", a.toFixed(2));
    console.log("b =", b.toFixed(2));
    console.log("c =", c.toFixed(2));
    console.log("alpha =", alpha.toFixed(2), "градусів");
    console.log("beta =", beta.toFixed(2), "градусів");

    return "success";
}
