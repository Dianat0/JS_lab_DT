let name = " Діана";
console.log(name);
console.log(`
ІНСТРУКЦІЯ З ВИКОРИСТАННЯ ФУНКЦІЇ triangle:

triangle(значення1, "тип1", значення2, "тип2")

Можливі типи:
"leg"             - катет
"hypotenuse"      - гіпотенуза
"adjacent angle"  - прилеглий до катета кут
"opposite angle"  - протилежний до катета кут
"angle"           - гострий кут, якщо задана гіпотенуза

Приклади:
triangle(4, "leg", 8, "hypotenuse");
triangle(8, "hypotenuse", 4, "leg");
triangle(3, "leg", 4, "leg");
triangle(5, "hypotenuse", 30, "angle");

Кути задаються у градусах.
`);

function triangle(value1, type1, value2, type2) {

    // Перевірка типів
    const validTypes = [
        "leg",
        "hypotenuse",
        "adjacent angle",
        "opposite angle",
        "angle"
    ];

    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Помилка: перечитайте інструкцію та перевірте типи аргументів.");
        return "failed";
    }

    // Перевірка числових значень
    if (!Number.isFinite(value1) || !Number.isFinite(value2)) {
        return "Помилка: значення повинні бути числами.";
    }

    if (value1 <= 0 || value2 <= 0) {
        return "Помилка: значення повинні бути додатними.";
    }

    // Не можна задавати два однакові типи
    if (type1 === type2) {
        console.log("Помилка: задана несумісна пара типів. Перечитайте інструкцію.");
        return "failed";
    }

    // Зручне зберігання аргументів
    let elements = [
        { value: value1, type: type1 },
        { value: value2, type: type2 }
    ];

    let a, b, c, alpha, beta;

    // Функції переведення градусів у радіани та навпаки
    const toRadians = degrees => degrees * Math.PI / 180;
    const toDegrees = radians => radians * 180 / Math.PI;

    // ------------------------------------------------
    // 1. Два катети
    // ------------------------------------------------
    if (type1 === "leg" && type2 === "leg") {
        a = value1;
        b = value2;

        c = Math.sqrt(a * a + b * b);

        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;
    }

    // ------------------------------------------------
    // 2. Катет + гіпотенуза
    // ------------------------------------------------
    else if (
        (type1 === "leg" && type2 === "hypotenuse") ||
        (type1 === "hypotenuse" && type2 === "leg")
    ) {
        let leg, hyp;

        if (type1 === "leg") {
            leg = value1;
            hyp = value2;
        } else {
            leg = value2;
            hyp = value1;
        }

        if (leg >= hyp) {
            return "Помилка: катет повинен бути меншим за гіпотенузу.";
        }

        c = hyp;

        // Визначаємо, який саме катет заданий
        // Наразі заданий катет вважаємо a
        a = leg;
        b = Math.sqrt(c * c - a * a);

        alpha = toDegrees(Math.asin(a / c));
        beta = 90 - alpha;
    }

    // ------------------------------------------------
    // 3. Гіпотенуза + кут
    // ------------------------------------------------
    else if (
        (type1 === "hypotenuse" && type2 === "angle") ||
        (type1 === "angle" && type2 === "hypotenuse")
    ) {
        let hyp, angle;

        if (type1 === "hypotenuse") {
            hyp = value1;
            angle = value2;
        } else {
            hyp = value2;
            angle = value1;
        }

        if (angle <= 0 || angle >= 90) {
            return "Помилка: гострий кут повинен бути більшим за 0° та меншим за 90°.";
        }

        c = hyp;

        // Заданий angle вважаємо alpha
        alpha = angle;
        beta = 90 - alpha;

        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
    }

    // ------------------------------------------------
    // 4. Катет + прилеглий кут
    // ------------------------------------------------
    else if (
        (type1 === "leg" && type2 === "adjacent angle") ||
        (type1 === "adjacent angle" && type2 === "leg")
    ) {
        let leg, angle;

        if (type1 === "leg") {
            leg = value1;
            angle = value2;
        } else {
            leg = value2;
            angle = value1;
        }

        if (angle <= 0 || angle >= 90) {
            return "Помилка: кут повинен бути гострим (0° < angle < 90°).";
        }

        // Катет вважаємо прилеглим до alpha
        b = leg;
        alpha = angle;
        beta = 90 - alpha;

        a = b * Math.tan(toRadians(alpha));
        c = b / Math.cos(toRadians(alpha));
    }

    // ------------------------------------------------
    // 5. Катет + протилежний кут
    // ------------------------------------------------
    else if (
        (type1 === "leg" && type2 === "opposite angle") ||
        (type1 === "opposite angle" && type2 === "leg")
    ) {
        let leg, angle;

        if (type1 === "leg") {
            leg = value1;
            angle = value2;
        } else {
            leg = value2;
            angle = value1;
        }

        if (angle <= 0 || angle >= 90) {
            return "Помилка: кут повинен бути гострим (0° < angle < 90°).";
        }

        // Катет вважаємо протилежним до alpha
        a = leg;
        alpha = angle;
        beta = 90 - alpha;

        c = a / Math.sin(toRadians(alpha));
        b = a / Math.tan(toRadians(alpha));
    }

    // ------------------------------------------------
    // 6. Інші несумісні комбінації
    // ------------------------------------------------
    else {
        console.log(
            "Помилка: така комбінація типів аргументів не підтримується. " +
            "Перечитайте інструкцію."
        );
        return "failed";
    }

    // Перевірка результатів
    if (
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(c) ||
        a <= 0 ||
        b <= 0 ||
        c <= 0
    ) {
        return "Помилка: неможливо побудувати такий прямокутний трикутник.";
    }

    // Перевірка теореми Піфагора
    if (Math.abs(a * a + b * b - c * c) > 0.000001) {
        return "Помилка: отримані значення не утворюють прямокутний трикутник.";
    }

    // Виведення результатів
    console.log("Результат розв'язання прямокутного трикутника:");
    console.log(`a = ${a.toFixed(4)}`);
    console.log(`b = ${b.toFixed(4)}`);
    console.log(`c = ${c.toFixed(4)}`);
    console.log(`alpha = ${alpha.toFixed(4)}°`);
    console.log(`beta = ${beta.toFixed(4)}°`);

    return "success";
}
