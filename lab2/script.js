// 1.2.3: car1 через new Object()
var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 200;
car1.driver = { name: "09в", category: "C", "personal limitations": "No driving at night" };
car1.tuning = true;
car1["number of accidents"] = 0;

// 1.2.4: car2 через літерал {}
var car2 = {
  color: "blue",
  maxSpeed: 150,
  driver: { name: "Іван Іванов", category: "B", "personal limitations": null },
  tuning: false,
  "number of accidents": 2
};

// 1.2.5 - 1.2.6: Методи drive
car1.drive = function() { console.log("I am not driving at night"); };
car2.drive = function() { console.log("I can drive anytime"); };
car1.drive();
car2.drive();

// 1.2.7 - 1.2.9: Конструктор Truck
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
      var night = this.driver.nightDriving ? "drives at night" : "does not drive at night";
      console.log("Driver " + this.driver.name + " " + night + " and has " + this.driver.experience + " years of experience");
    }
  };
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
  this.driver = { name: name, nightDriving: nightDriving, experience: experience };
};

// 1.2.10: Демонстрація Truck
var t1 = new Truck("red", 5000, 80, "Volvo", "FH");
var t2 = new Truck("white", 4000, 75, "MAN", "TGX");
t1.AssignDriver("Іван Іванов", true, 5);
t2.AssignDriver("Іван Іванов", false, 10);
t1.trip();
t2.trip();


// === ЧАСТИНА 2: ES6 Класи ===

// 1.2.12 - 1.2.15: Square
class Square {
  constructor(a) { this.a = a; }
  static help() { console.log("Квадрат: чотирикутник із рівними сторонами і кутами 90°."); }
  length() { console.log("Периметр:", 4 * this.a); }
  square() { console.log("Площа:", this.a * this.a); }
  info() {
    console.log(`Square: сторони=${this.a}, кути=90°`);
    this.length();
    this.square();
  }
}

// 1.2.16 - 1.2.17: Rectangle
class Rectangle extends Square {
  constructor(a, b) { super(a); this.b = b; }
  static help() { console.log("Прямокутник: протилежні сторони рівні, кути 90°."); }
  length() { console.log("Периметр:", 2 * (this.a + this.b)); }
  square() { console.log("Площа:", this.a * this.b); }
  info() {
    console.log(`Rectangle: a=${this.a}, b=${this.b}, кути=90°`);
    this.length();
    this.square();
  }
}

// 1.2.18 - 1.2.19 & 1.2.22: Rhombus (з гетерами/сетерами)
class Rhombus extends Square {
  constructor(a, alpha, beta) { super(a); this.alpha = alpha; this.beta = beta; }
  
  get sideA() { return this.a; }
  set sideA(v) { this.a = v; }
  get angleA() { return this.alpha; }
  set angleA(v) { this.alpha = v; }
  get angleB() { return this.beta; }
  set angleB(v) { this.beta = v; }

  static help() { console.log("Ромб: паралелограм з рівними сторонами."); }
  length() { console.log("Периметр:", 4 * this.a); }
  square() { console.log("Площа:", (this.a ** 2 * Math.sin(this.beta * Math.PI / 180)).toFixed(2)); }
  info() {
    console.log(`Rhombus: а=${this.a}, кути=${this.alpha}°, ${this.beta}°`);
    this.length();
    this.square();
  }
}

// 1.2.20 - 1.2.21: Parallelogram
class Parallelogram extends Rectangle {
  constructor(a, b, alpha, beta) { super(a, b); this.alpha = alpha; this.beta = beta; }
  static help() { console.log("Паралелограм: протилежні сторони та кути рівні."); }
  length() { console.log("Периметр:", 2 * (this.a + this.b)); }
  square() { console.log("Площа:", (this.a * this.b * Math.sin(this.beta * Math.PI / 180)).toFixed(2)); }
  info() {
    console.log(`Parallelogram: a=${this.a}, b=${this.b}, кути=${this.alpha}°, ${this.beta}°`);
    this.length();
    this.square();
  }
}

// 1.2.23 - 1.2.24: Тестування класів
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

new Square(4).info();
new Rectangle(3, 6).info();
new Rhombus(5, 120, 60).info();
new Parallelogram(4, 7, 150, 30).info();


// === ЧАСТИНА 3: Замикання та Функції ===

// 1.2.25 - 1.2.26: Triangular
function Triangular(a = 3, b = 4, c = 5) {
  const { a: x, b: y, c: z } = { a, b, c };
  return { a: x, b: y, c: z };
}
console.log(Triangular());
console.log(Triangular(6, 8, 10));
console.log(Triangular(5, 12, 13));

// 1.2.27 - 1.2.28: PiMultiplier
function PiMultiplier(num) {
  return () => Math.PI * num;
}
console.log("π * 2:", PiMultiplier(2)());
console.log("π * (3/2):", PiMultiplier(1.5)());
console.log("π / 2:", PiMultiplier(0.5)());

// 1.2.29 - 1.2.31: Painter
function Painter(color) {
  return function(obj) {
    if (obj && obj.type) {
      console.log(`Color: ${color}, Type: ${obj.type}`);
    } else {
      console.log("No 'type' property occurred!");
    }
  };
}

const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

const obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const obj2 = { type: "Truck", avgSpeed: 90, loadCapacity: 2400 };
const obj3 = { maxSpeed: 180, color: "purple", isCar: true };

[obj1, obj2, obj3].forEach(obj => {
  PaintBlue(obj);
  PaintRed(obj);
  PaintYellow(obj);
});
