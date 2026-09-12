// ===== Частина 1: без класів =====

var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = "Іван Петренко";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";
car1.tuning = true;
car1["number of accidents"] = 0;
car1.drive = () => console.log("I am not driving at night");

var car2 = {
  color: "blue",
  maxSpeed: 200,
  driver: { name: "Іван Петренко", category: "B", "personal limitations": null },
  tuning: false,
  "number of accidents": 2,
  drive: () => console.log("I can drive anytime")
};

car1.drive();
car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
  Object.assign(this, { color, weight, avgSpeed, brand, model });
  this.trip = function () {
    if (!this.driver) return console.log("No driver assigned");
    const { name, nightDriving, experience } = this.driver;
    console.log(`Driver ${name} ${nightDriving ? "drives at night" : "does not drive at night"} and has ${experience} years of experience`);
  };
}
Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = { name, nightDriving, experience };
};

var truck1 = new Truck("white", 5000, 80.5, "Volvo", "FH16");
var truck2 = new Truck("green", 4000, 75.2, "Man", "TGX");
truck1.AssignDriver("Іван Петренко", true, 10);
truck2.AssignDriver("Петро Іванов", false, 5);
truck1.trip();
truck2.trip();


// ===== Частина 2: класи ES6 =====

class Square {
  constructor(a) { this.a = a; }
  static help() { console.log("Квадрат: рівні сторони, кути 90°"); }
  length() { console.log("Периметр: " + this.a * 4); }
  square() { console.log("Площа: " + this.a ** 2); }
  info() {
    console.log(`Квадрат — сторони: ${[this.a, this.a, this.a, this.a]}, кути: 90,90,90,90, периметр: ${this.a * 4}, площа: ${this.a ** 2}`);
  }
}

class Rectangle extends Square {
  constructor(a, b) { super(a); this.b = b; }
  static help() { console.log("Прямокутник: протилежні сторони рівні, кути 90°"); }
  length() { console.log("Периметр: " + (this.a * 2 + this.b * 2)); }
  square() { console.log("Площа: " + this.a * this.b); }
  info() {
    console.log(`Прямокутник — сторони: ${[this.a, this.b, this.a, this.b]}, кути: 90,90,90,90, периметр: ${this.a * 2 + this.b * 2}, площа: ${this.a * this.b}`);
  }
}

class Rhombus extends Square {
  constructor(a, alpha, beta) { super(a); this.alpha = alpha; this.beta = beta; }
  static help() { console.log("Ромб: рівні сторони, попарно рівні кути"); }
  length() { console.log("Периметр: " + this.a * 4); }
  square() { console.log("Площа: " + (this.a ** 2 * Math.sin(this.alpha * Math.PI / 180)).toFixed(2)); }
  info() {
    const s = (this.a ** 2 * Math.sin(this.alpha * Math.PI / 180)).toFixed(2);
    console.log(`Ромб — сторони: ${[this.a, this.a, this.a, this.a]}, кути: ${[this.alpha, this.beta, this.alpha, this.beta]}, периметр: ${this.a * 4}, площа: ${s}`);
  }
  get sideA() { return this.a; } set sideA(v) { this.a = v; }
  get angleAlpha() { return this.alpha; } set angleAlpha(v) { this.alpha = v; }
  get angleBeta() { return this.beta; } set angleBeta(v) { this.beta = v; }
}

class Parallelogram extends Rectangle {
  constructor(a, b, alpha, beta) { super(a, b); this.alpha = alpha; this.beta = beta; }
  static help() { console.log("Паралелограм: протилежні сторони паралельні й рівні"); }
  length() { console.log("Периметр: " + (this.a * 2 + this.b * 2)); }
  square() { console.log("Площа: " + (this.a * this.b * Math.sin(this.alpha * Math.PI / 180)).toFixed(2)); }
  info() {
    const s = (this.a * this.b * Math.sin(this.alpha * Math.PI / 180)).toFixed(2);
    console.log(`Паралелограм — сторони: ${[this.a, this.b, this.a, this.b]}, кути: ${[this.alpha, this.beta, this.alpha, this.beta]}, периметр: ${this.a * 2 + this.b * 2}, площа: ${s}`);
  }
}

[Square, Rectangle, Rhombus, Parallelogram].forEach(cls => cls.help());

var square1 = new Square(5);
var rectangle1 = new Rectangle(4, 6);
var rhombus1 = new Rhombus(5, 120, 60);
var parallelogram1 = new Parallelogram(4, 6, 110, 70);
[square1, rectangle1, rhombus1, parallelogram1].forEach(obj => obj.info());


// ===== Частина 3: функції першого класу =====

const Triangular = (a = 3, b = 4, c = 5) => ({ a, b, c });
[Triangular(), Triangular(6, 8, 10), Triangular(7, 7, 7)].forEach(({ a, b, c }) =>
  console.log(`Трикутник: a=${a}, b=${b}, c=${c}`)
);

const PiMultiplier = (n) => () => Math.PI * n;
const multiplyByTwo = PiMultiplier(2);
const multiplyByThreeHalf = PiMultiplier(3 / 2);
const divideByTwo = PiMultiplier(1 / 2);
console.log(multiplyByTwo(), multiplyByThreeHalf(), divideByTwo());

const Painter = (color) => (obj) =>
  console.log(obj.type !== undefined ? `${color} ${obj.type}` : "No 'type' property occurred!");

const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");

const object1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const object2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
const object3 = { maxSpeed: 180, color: "purple", isCar: true };

[object1, object2, object3].forEach(obj => {
  PaintBlue(obj); PaintRed(obj); PaintYellow(obj);
});
