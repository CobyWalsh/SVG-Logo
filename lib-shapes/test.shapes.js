// Importing Triangle, Square, Circle classes from ./shapes.js
const { Triangle, Square, Circle } = require("./shapes.js");

// Testing for a triangle with a blue background to render
describe("Triangle test", () => {
  test("test for a triangle with a yellow background", () => {
    const shape = new Triangle();
    shape.setColor("yellow");
    expect(shape.render()).toEqual(
      '<polygon points="150, 18 244, 182 56, 182" fill="yellow" />'
    );
  });
});

// Testing for a square with a purple background to render
describe("Square test", () => {
  test("test for a square with a purple background", () => {
    const shape = new Square();
    shape.setColor("purple");
    expect(shape.render()).toEqual(
      '<rect x="73" y="40" width="160" height="160" fill="purple" />'
    );
  });
});

// Testing for a circle with a #ca00ca background to render
describe("Circle test", () => {
  test("test for a circle with a #ca00ca background", () => {
    const shape = new Circle();
    shape.setColor("#ca00ca");
    expect(shape.render()).toEqual(
      '<circle cx="150" cy="115" r="80" fill="#ca00ca" />'
    );
  });
});