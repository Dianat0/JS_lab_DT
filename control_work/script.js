//Завдання 1: функція TriangleArea
function TriangleArea(base = 7, height = 3) {
  const area = (base * height) / 2;
  console.log("Площа трикутника:", area);
  return area;
}

TriangleArea(3, 6); 
TriangleArea();   

//Завдання 2: конструктор Boat (без class)
function Boat(color, maxSpeed, maxTonnage, brand, countryOfRegistration) {
  this.color = color;
  this.maxSpeed = maxSpeed;
  this.maxTonnage = maxTonnage;
  this.brand = brand;
  this.countryOfRegistration = countryOfRegistration;
}

// "Статичний" метод через prototype
Boat.prototype.AssignCaptain = function (name, yearsOfExperience, hasFamily) {
  this.captain = {
    name: name,
    yearsOfExperience: yearsOfExperience,
    hasFamily: hasFamily
  };
};
const myBoat = new Boat("blue", 45.5, 120, "Boing", "Ukraine");
myBoat.AssignCaptain("Jek", 15, true);
console.log(myBoat);


//Завдання 3: класи ES6
class SimpleCircle {
  constructor(majorRadius) {
    this.majorRadius = majorRadius; 
  }

  set majorRadius(value) {
    this._majorRadius = value;
  }
  // get majorRadius() {
  //   return this._majorRadius;
  // }
}

class SimpleEllipse extends SimpleCircle {
  constructor(majorRadius, minorRadius) {
    super(majorRadius);
    this.minorRadius = minorRadius;
  }

  static area(ellipse) {
    return Math.PI * ellipse.majorRadius * ellipse.minorRadius;
  }
}

const circle = new SimpleCircle(5);
console.log(circle);

const ellipse = new SimpleEllipse(8, 4);
console.log(ellipse);

console.log("Площа еліпса:", SimpleEllipse.area(ellipse));

//Завдання 4: SubGenerator
function SubGenerator(number) {
  return function (x) {
    return x - number;
  };
}
const subtract5 = SubGenerator(5);
const subtract2_5 = SubGenerator(2.5);

console.log(subtract5(20));    
console.log(subtract2_5(10));  
