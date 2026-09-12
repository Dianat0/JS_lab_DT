var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = "Тарас Ігор";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;
car1.drive = function () {
  console.log("I am not driving at night");
};
var car2 = {
  color: "blue",
  maxSpeed: 200,
  driver: {
    name: "Тарас Діана",
    category: "B",
    "personal limitations": null
  },
  tuning: false,
  "number of accidents": 2,
  drive: function () {
    console.log("I can drive anytime");
  }
};
console.log("=== car1 та car2 ===");
console.log(car1);
console.log(car2);
car1.drive(); // I am not driving at night
car2.drive(); // I can drive anytime

function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;
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

Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience
  };
};

console.log("\n=== Truck ===");
var truck1 = new Truck("white", 5000, 80.5, "Volvo", "FH16");
var truck2 = new Truck("green", 4000, 75.2, "Man", "TGX");

truck1.AssignDriver("Тарас Ігор", true, 10);
truck2.AssignDriver("Тарас Діана", false, 5);
truck1.trip(); 
truck2.trip(); 

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

//  Клас Rectangle (успадкований від Square)
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

// Клас Rhombus (успадкований від Square) 
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
//Клас Parallelogram (успадкований від Rectangle)
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
//Виклик статичного методу help для кожного класу
console.log("\n help()");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

//По одному об'єкту кожного класу + виклик info()
console.log("\ninfo()");
var square1 = new Square(5);
var rectangle1 = new Rectangle(4, 6);
var rhombus1 = new Rhombus(5, 120, 60);
var parallelogram1 = new Parallelogram(4, 6, 110, 70);

square1.info();
rectangle1.info();
rhombus1.info();
parallelogram1.info();

console.log("\n Ґеттери/сеттери Rhombus");
console.log("Було sideA: " + rhombus1.sideA);
rhombus1.sideA = 8;
console.log("Стало sideA: " + rhombus1.sideA);

function Triangular(a = 3, b = 4, c = 5) {
  return { a: a, b: b, c: c };
}

console.log("\nTriangular");
var { a: a1, b: b1, c: c1 } = Triangular(); 
var { a: a2, b: b2, c: c2 } = Triangular(6, 8, 10);
var { a: a3, b: b3, c: c3 } = Triangular(7, 7, 7);
console.log("Трикутник 1 (за замовчуванням): a=" + a1 + ", b=" + b1 + ", c=" + c1);
console.log("Трикутник 2: a=" + a2 + ", b=" + b2 + ", c=" + c2);
console.log("Трикутник 3: a=" + a3 + ", b=" + b3 + ", c=" + c3);


// повертає функцію 
function PiMultiplier(number) {
  return function () {
    return Math.PI * number;
  };
}

console.log("\nPiMultiplier");
var multiplyByTwo = PiMultiplier(2);
var multiplyByThreeHalf = PiMultiplier(3 / 2);
var divideByTwo = PiMultiplier(1 / 2);

console.log("π * 2 = " + multiplyByTwo());
console.log("π * 3/2 = " + multiplyByThreeHalf());
console.log("π / 2 = " + divideByTwo());

function Painter(color) {
  return function (obj) {
    if (obj.type !== undefined) {
      console.log(color + " " + obj.type);
    } else {
      console.log("No 'type' property occurred!");
    }
  };
}
var PaintBlue = Painter("blue");
var PaintRed = Painter("red");
var PaintYellow = Painter("yellow");
console.log("\n Painter");
var object1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
var object2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
var object3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log(" object1");
PaintBlue(object1);
PaintRed(object1);
PaintYellow(object1);
console.log(" object2");
PaintBlue(object2);
PaintRed(object2);
PaintYellow(object2);
console.log(" object3 (немає властивості type) ");
PaintBlue(object3);
PaintRed(object3);
PaintYellow(object3);
