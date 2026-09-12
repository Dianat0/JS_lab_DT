console.log("Hello World");
/* ==========================================================
   ЧАСТИНА 1. Об'єкти та функції БЕЗ синтаксису класів ES6
   ========================================================== */

// --- 1.2.3 Об'єкт car1 через new Object() ---
var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;

car1.driver = new Object();
car1.driver.name = "Іван Петренко";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";

car1.tuning = true;
car1["number of accidents"] = 0;

// --- 1.2.5 Метод drive для car1 ---
car1.drive = function () {
  console.log("I am not driving at night");
};

// --- 1.2.4 Об'єкт car2 через літерал об'єкта ---
var car2 = {
  color: "blue",
  maxSpeed: 200,
  driver: {
    name: "Іван Петренко",
    category: "B",
    "personal limitations": null
  },
  tuning: false,
  "number of accidents": 2,

  // --- 1.2.6 Метод drive для car2 ---
  drive: function () {
    console.log("I can drive anytime");
  }
};

console.log("=== car1 та car2 ===");
console.log(car1);
console.log(car2);
car1.drive(); // I am not driving at night
car2.drive(); // I can drive anytime


// --- 1.2.7 Конструктор Truck ---
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;

  // --- 1.2.9 Метод trip створюється прямо в конструкторі ---
  this.trip = function () {
    if (!this.driver) {
      console.log("No driver assigned");
      return;
    }

    var message = "Driver " + this.driver.name + " ";
    message += this.driver.nightDriving
      ? "drives at night"
      : "does not drive at night";
    message += " and has " + this.driver.experience + " years of experience";

    console.log(message);
  };
}

// --- 1.2.8 "Статичний" метод AssignDriver через prototype ---
Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience
  };
};

// --- 1.2.10 Два об'єкти Truck ---
console.log("\n=== Truck ===");
var truck1 = new Truck("white", 5000, 80.5, "Volvo", "FH16");
var truck2 = new Truck("green", 4000, 75.2, "Man", "TGX");

truck1.AssignDriver("Іван Петренко", true, 10);
truck2.AssignDriver("Петро Іванов", false, 5);

truck1.trip(); // Driver Іван Петренко drives at night and has 10 years of experience
truck2.trip(); // Driver Петро Іванов does not drive at night and has 5 years of experience


/* ==========================================================
   ЧАСТИНА 2. Класи ES6
   ========================================================== */

// --- 1.2.12 - 1.2.15 Клас Square ---
class Square {
  constructor(a) {
    this.a = a;
  }

  static help() {
    console.log(
      "Квадрат - чотирикутник з рівними сторонами і кутами по 90 градусів"
    );
  }

  length() {
    console.log("Сума довжин сторін: " + this.a * 4);
  }

  square() {
    console.log("Площа: " + this.a * this.a);
  }

  info() {
    console.log("--- Квадрат ---");
    console.log("Сторона 1: " + this.a);
    console.log("Сторона 2: " + this.a);
    console.log("Сторона 3: " + this.a);
    console.log("Сторона 4: " + this.a);
    console.log("Кут 1: 90");
    console.log("Кут 2: 90");
    console.log("Кут 3: 90");
    console.log("Кут 4: 90");
    console.log("Сума довжин сторін: " + this.a * 4);
    console.log("Площа: " + this.a * this.a);
  }
}

// --- 1.2.16 - 1.2.17 Клас Rectangle (успадкований від Square) ---
class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }

  static help() {
    console.log(
      "Прямокутник - чотирикутник з протилежними рівними сторонами і кутами по 90 градусів"
    );
  }

  length() {
    console.log("Сума довжин сторін: " + (this.a * 2 + this.b * 2));
  }

  square() {
    console.log("Площа: " + this.a * this.b);
  }

  info() {
    console.log("--- Прямокутник ---");
    console.log("Сторона a: " + this.a);
    console.log("Сторона b: " + this.b);
    console.log("Сторона a: " + this.a);
    console.log("Сторона b: " + this.b);
    console.log("Кут 1: 90");
    console.log("Кут 2: 90");
    console.log("Кут 3: 90");
    console.log("Кут 4: 90");
    console.log("Сума довжин сторін: " + (this.a * 2 + this.b * 2));
    console.log("Площа: " + this.a * this.b);
  }
}

// --- 1.2.18 - 1.2.19 Клас Rhombus (успадкований від Square) ---
class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this.alpha = alpha;
    this.beta = beta;
  }

  static help() {
    console.log(
      "Ромб - чотирикутник з рівними сторонами і попарно рівними протилежними кутами"
    );
  }

  length() {
    console.log("Сума довжин сторін: " + this.a * 4);
  }

  square() {
    var radians = (this.alpha * Math.PI) / 180;
    console.log("Площа: " + (this.a * this.a * Math.sin(radians)).toFixed(2));
  }

  info() {
    console.log("--- Ромб ---");
    console.log("Сторона 1: " + this.a);
    console.log("Сторона 2: " + this.a);
    console.log("Сторона 3: " + this.a);
    console.log("Сторона 4: " + this.a);
    console.log("Тупий кут: " + this.alpha);
    console.log("Гострий кут: " + this.beta);
    console.log("Тупий кут: " + this.alpha);
    console.log("Гострий кут: " + this.beta);
    console.log("Сума довжин сторін: " + this.a * 4);
    var radians = (this.alpha * Math.PI) / 180;
    console.log("Площа: " + (this.a * this.a * Math.sin(radians)).toFixed(2));
  }

  // --- 1.2.22 Ґеттери і сеттери (Rhombus не використовується як база для Parallelogram) ---
  get sideA() {
    return this.a;
  }
  set sideA(value) {
    this.a = value;
  }

  get angleAlpha() {
    return this.alpha;
  }
  set angleAlpha(value) {
    this.alpha = value;
  }

  get angleBeta() {
    return this.beta;
  }
  set angleBeta(value) {
    this.beta = value;
  }
}

// --- 1.2.20 - 1.2.21 Клас Parallelogram (успадкований від Rectangle) ---
class Parallelogram extends Rectangle {
  constructor(a, b, alpha, beta) {
    super(a, b);
    this.alpha = alpha;
    this.beta = beta;
  }

  static help() {
    console.log(
      "Паралелограм - чотирикутник з попарно паралельними і рівними протилежними сторонами"
    );
  }

  length() {
    console.log("Сума довжин сторін: " + (this.a * 2 + this.b * 2));
  }

  square() {
    var radians = (this.alpha * Math.PI) / 180;
    console.log("Площа: " + (this.a * this.b * Math.sin(radians)).toFixed(2));
  }

  info() {
    console.log("--- Паралелограм ---");
    console.log("Сторона a: " + this.a);
    console.log("Сторона b: " + this.b);
    console.log("Сторона a: " + this.a);
    console.log("Сторона b: " + this.b);
    console.log("Тупий кут: " + this.alpha);
    console.log("Гострий кут: " + this.beta);
    console.log("Тупий кут: " + this.alpha);
    console.log("Гострий кут: " + this.beta);
    console.log("Сума довжин сторін: " + (this.a * 2 + this.b * 2));
    var radians = (this.alpha * Math.PI) / 180;
    console.log("Площа: " + (this.a * this.b * Math.sin(radians)).toFixed(2));
  }
}

// --- 1.2.23 Виклик статичного методу help для кожного класу ---
console.log("\n=== help() ===");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// --- 1.2.24 По одному об'єкту кожного класу + виклик info() ---
console.log("\n=== info() ===");
var square1 = new Square(5);
var rectangle1 = new Rectangle(4, 6);
var rhombus1 = new Rhombus(5, 120, 60);
var parallelogram1 = new Parallelogram(4, 6, 110, 70);

square1.info();
rectangle1.info();
rhombus1.info();
parallelogram1.info();

// Демонстрація ґеттерів/сеттерів Rhombus
console.log("\n=== Ґеттери/сеттери Rhombus ===");
console.log("Було sideA: " + rhombus1.sideA);
rhombus1.sideA = 8;
console.log("Стало sideA: " + rhombus1.sideA);


/* ==========================================================
   ЧАСТИНА 3. Функції першого класу
   ========================================================== */

// --- 1.2.25 Функція Triangular зі значеннями за замовчуванням ---
function Triangular(a = 3, b = 4, c = 5) {
  return { a: a, b: b, c: c };
}

// --- 1.2.26 Створення 3 об'єктів через destructuring ---
console.log("\n=== Triangular ===");
var { a: a1, b: b1, c: c1 } = Triangular(); // значення за замовчуванням
var { a: a2, b: b2, c: c2 } = Triangular(6, 8, 10);
var { a: a3, b: b3, c: c3 } = Triangular(7, 7, 7);

console.log("Трикутник 1 (за замовчуванням): a=" + a1 + ", b=" + b1 + ", c=" + c1);
console.log("Трикутник 2: a=" + a2 + ", b=" + b2 + ", c=" + c2);
console.log("Трикутник 3: a=" + a3 + ", b=" + b3 + ", c=" + c3);


// --- 1.2.27 Функція PiMultiplier, яка повертає функцію ---
function PiMultiplier(number) {
  return function () {
    return Math.PI * number;
  };
}

// --- 1.2.28 Створення 3 функцій та виведення результату ---
console.log("\n=== PiMultiplier ===");
var multiplyByTwo = PiMultiplier(2);
var multiplyByThreeHalf = PiMultiplier(3 / 2);
var divideByTwo = PiMultiplier(1 / 2);

console.log("π * 2 = " + multiplyByTwo());
console.log("π * 3/2 = " + multiplyByThreeHalf());
console.log("π / 2 = " + divideByTwo());


// --- 1.2.29 Функція Painter, яка повертає функцію ---
function Painter(color) {
  return function (obj) {
    if (obj.type !== undefined) {
      console.log(color + " " + obj.type);
    } else {
      console.log("No 'type' property occurred!");
    }
  };
}

// --- 1.2.30 Створення PaintBlue, PaintRed, PaintYellow ---
var PaintBlue = Painter("blue");
var PaintRed = Painter("red");
var PaintYellow = Painter("yellow");

// --- 1.2.31 Тестові об'єкти та демонстрація роботи ---
console.log("\n=== Painter ===");
var object1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
var object2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
var object3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log("-- object1 --");
PaintBlue(object1);
PaintRed(object1);
PaintYellow(object1);

console.log("-- object2 --");
PaintBlue(object2);
PaintRed(object2);
PaintYellow(object2);

console.log("-- object3 (немає властивості type) --");
PaintBlue(object3);
PaintRed(object3);
PaintYellow(object3);
