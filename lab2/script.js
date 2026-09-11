console.log("=== ЧАСТИНА 1: ES5 (без синтаксису класів ES6) ===");

// 1.2.3: Об'єкт car1 за допомогою new Object()
var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;
car1.driver = {
  name: "Тарас Шевченко",
  category: "C",
  "personal limitations": "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;

// 1.2.4: Об'єкт car2 за допомогою синтаксису літерала
var car2 = {
  color: "blue",
  maxSpeed: 180, // Виправлено '=' на ':'
  driver: {
    name: "Тарас Шевченко",
    category: "B",
    "personal limitations": null
  },
  tuning: false,
  "number of accidents": 2
};

// 1.2.5: Метод drive для car1
car1.drive = function() {
  console.log("I am not driving at night");
};
console.log("Тест car1.drive():");
car1.drive();

// 1.2.6: Метод drive для car2
car2.drive = function() {
  console.log("I can drive anytime");
};
console.log("Тест car2.drive():");
car2.drive();

// 1.2.7 & 1.2.9: Конструктор Truck з методом trip
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;

  this.trip = function() {
    if (!this.driver) {
      console.log("No driver assigned");
    } else {
      var nightText = this.driver.nightDriving ? "drives at night" : "does not drive at night";
      console.log("Driver " + this.driver.name + " " + nightText + " and has " + this.driver.experience + " years of experience");
    }
  };
}

// 1.2.8: Метод AssignDriver через prototype
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience
  };
};

// 1.2.10: Створення 2 об'єктів Truck та демонстрація trip
var truck1 = new Truck("black", 5000, 80.5, "Volvo", "FH16");
var truck2 = new Truck("white", 4000, 75.0, "MAN", "TGX");

truck1.AssignDriver("Тарас Шевченко", true, 5);
truck2.AssignDriver("Тарас Шевченко", false, 10);

console.log("\nТест truck1.trip():");
truck1.trip();

console.log("Тест truck2.trip():");
truck2.trip();


// ==========================================
// Завдання 1.2.11 – 1.2.24 (З використанням ES6 класів)
// ==========================================

console.log("\n=== ЧАСТИНА 2: ES6 Класи ===");

// 1.2.12 - 1.2.15: Клас Square
class Square {
  constructor(a) {
    this.a = a;
  }

  static help() {
    console.log("Квадрат — це правильний чотирикутник, у якого всі сторони і кути рівні між собою.");
  }

  length() {
    const perimeter = 4 * this.a;
    console.log(`Периметр (сума довжин сторін): ${perimeter}`);
    return perimeter;
  }

  square() {
    const area = this.a * this.a;
    console.log(`Площа: ${area}`);
    return area;
  }

  info() {
    console.log(`--- Характеристика Square ---`);
    console.log(`Довжини сторін: a=${this.a}, b=${this.a}, c=${this.a}, d=${this.a}`);
    console.log(`Кути: 90°, 90°, 90°, 90°`);
    this.length();
    this.square();
  }
}

// 1.2.16 - 1.2.17: Клас Rectangle
class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }

  static help() {
    console.log("Прямокутник — це чотирикутник, у якого всі кути прямі (90°), а протилежні сторони рівні.");
  }

  length() {
    const perimeter = 2 * (this.a + this.b);
    console.log(`Периметр (сума довжин сторін): ${perimeter}`);
    return perimeter;
  }

  square() {
    const area = this.a * this.b;
    console.log(`Площа: ${area}`);
    return area;
  }

  info() {
    console.log(`--- Характеристика Rectangle ---`);
    console.log(`Довжини сторін: a=${this.a}, b=${this.b}, c=${this.a}, d=${this.b}`);
    console.log(`Кути: 90°, 90°, 90°, 90°`);
    this.length();
    this.square();
  }
}

// 1.2.18 - 1.2.19: Клас Rhombus
class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this.alpha = alpha; // тупий кут
    this.beta = beta;   // гострий кут
  }

  // 1.2.22: Ґеттери та сеттери для Rhombus
  get sideA() { return this.a; }
  set sideA(val) { this.a = val; }

  get angleAlpha() { return this.alpha; }
  set angleAlpha(val) { 
    this.alpha = val;
    this.beta = 180 - val;
  }

  get angleBeta() { return this.beta; }
  set angleBeta(val) { 
    this.beta = val;
    this.alpha = 180 - val;
  }

  static help() {
    console.log("Ромб — це паралелограм, у якого всі сторони рівні, а протилежні кути рівні.");
  }

  length() {
    const perimeter = 4 * this.a;
    console.log(`Периметр (сума довжин сторін): ${perimeter}`);
    return perimeter;
  }

  square() {
    // S = a^2 * sin(beta)
    const rad = (this.beta * Math.PI) / 180;
    const area = this.a * this.a * Math.sin(rad);
    console.log(`Площа: ${area.toFixed(2)}`);
    return area;
  }

  info() {
    console.log(`--- Характеристика Rhombus ---`);
    console.log(`Довжини сторін: a=${this.a}, b=${this.a}, c=${this.a}, d=${this.a}`);
    console.log(`Кути: тупі=${this.alpha}°, ${this.alpha}°; гострі=${this.beta}°, ${this.beta}°`);
    this.length();
    this.square();
  }
}

// 1.2.20 - 1.2.21: Клас Parallelogram (успадкований від Rectangle)
class Parallelogram extends Rectangle {
  constructor(a, b, alpha, beta) {
    super(a, b);
    this.alpha = alpha; // тупий кут
    this.beta = beta;   // гострий кут
  }

  static help() {
    console.log("Паралелограм — це чотирикутник, протилежні сторони якого попарно паралельні та рівні.");
  }

  length() {
    const perimeter = 2 * (this.a + this.b);
    console.log(`Периметр (сума довжин сторін): ${perimeter}`);
    return perimeter;
  }

  square() {
    // S = a * b * sin(beta)
    const rad = (this.beta * Math.PI) / 180;
    const area = this.a * this.b * Math.sin(rad);
    console.log(`Площа: ${area.toFixed(2)}`);
    return area;
  }

  info() {
    console.log(`--- Характеристика Parallelogram ---`);
    console.log(`Довжини сторін: a=${this.a}, b=${this.b}, c=${this.a}, d=${this.b}`);
    console.log(`Кути: тупі=${this.alpha}°, ${this.alpha}°; гострі=${this.beta}°, ${this.beta}°`);
    this.length();
    this.square();
  }
}

// 1.2.23: Викликаємо static method help для всіх класів
console.log("\n--- Довідка класів (help) ---");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// 1.2.24: Створення об'єктів та виклик info()
console.log("\n--- Інформація про об'єкти (info) ---");
const figSquare = new Square(5);
const figRectangle = new Rectangle(4, 8);
const figRhombus = new Rhombus(6, 120, 60);
const figParallelogram = new Parallelogram(5, 10, 150, 30);

figSquare.info();
figRectangle.info();
figRhombus.info();
figParallelogram.info();


// ==========================================
// Завдання 1.2.25 – 1.2.31 (Замикання та Деструктуризація)
// ==========================================

console.log("\n=== ЧАСТИНА 3: Замикання та Функції ===");

// 1.2.25: Функція Triangular із замовчуванням та деструктуризацією
function Triangular(a = 3, b = 4, c = 5) {
  const triObj = { a, b, c };
  const { a: sideA, b: sideB, c: sideC } = triObj;
  return { a: sideA, b: sideB, c: sideC };
}

// 1.2.26: Створення 3 об'єктів
const tri1 = Triangular();
const tri2 = Triangular(6, 8, 10);
const tri3 = Triangular(5, 12, 13);

console.log("Triangular 1 (default):", tri1);
console.log("Triangular 2:", tri2);
console.log("Triangular 3:", tri3);

// 1.2.27: Функція PiMultiplier
function PiMultiplier(number) {
  return function() {
    return Math.PI * number;
  };
}

// 1.2.28: Виклик PiMultiplier
const multBy2 = PiMultiplier(2);
const multBy3_2 = PiMultiplier(1.5); // 3/2 = 1.5
const divBy2 = PiMultiplier(0.5);     // π / 2 = π * 0.5

console.log("\nРезультати PiMultiplier:");
console.log("π * 2 =", multBy2());
console.log("π * (3/2) =", multBy3_2());
console.log("π / 2 =", divBy2());

// 1.2.29: Функція Painter
function Painter(color) {
  return function(obj) {
    if (obj && obj.type !== undefined) {
      console.log(`Color: ${color}, Type: ${obj.type}`);
    } else {
      console.log("No 'type' property occurred!");
    }
  };
}

// 1.2.30: Створення кастомних фарбувальників
const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

// 1.2.31: Тестові об'єкти з таблиці 12
const Obj1 = {
  maxSpeed: 280,
  type: "Sportcar",
  color: "magenta"
};

const Obj2 = {
  type: "Truck",
  avgSpeed: 90,
  loadCapacity: 2400
};

const Obj3 = {
  maxSpeed: 180,
  color: "purple",
  isCar: true
};

console.log("\nТест Painter на об'єктах:");
console.log("--- Obj1 ---");
PaintBlue(Obj1);
PaintRed(Obj1);
PaintYellow(Obj1);

console.log("--- Obj2 ---");
PaintBlue(Obj2);
PaintRed(Obj2);
PaintYellow(Obj2);

console.log("--- Obj3 ---");
PaintBlue(Obj3);
PaintRed(Obj3);
PaintYellow(Obj3);
