const Pet = require("../src/index.js");

describe("Pet constructor", () => {
   let Fluffy;

   beforeEach(() => {
      Fluffy = new Pet("Fluffy");
   })


   it("should be defined", () => {
      expect(Pet).toBeDefined();
   });

   it("should return an object", () => {
      expect(Fluffy).toBeInstanceOf(Object);
   });

   it(`should have a name property set to the passed argument`, () => {
     expect(Fluffy).toHaveProperty("name", "Fluffy");
   })

   it("should have an age property defaulted to 0", () => {
      expect(Fluffy).toHaveProperty("age", 0);
   })

   it(`should have a "living" property set to true`, () => {
      expect(Fluffy).toHaveProperty("living", true)
   })

   it(`should have a "hunger" property set to 5`, () => {
      expect(Fluffy).toHaveProperty("hunger", 50)
   })

   it(`should have a "fitness" property set to 50`, () => {
      expect(Fluffy).toHaveProperty("fitness", 50)
   })

   xit(`should have a "happiness" property set to 50`, () => {
      expect(Fluffy).toHaveProperty("happiness", 50)
   })

})


describe("Pet prototype", () => {

   it("should have a start method", () => {
      expect(Pet.prototype).toHaveProperty("start");
      expect(typeof Pet.prototype.start).toBe("function")
   })

   it("should have a growUp method", () => {
      expect(Pet.prototype).toHaveProperty("growUp");
      expect(typeof Pet.prototype.growUp).toBe("function")
   })

   it("should have increase and decrease hunger methods", () => {
      expect(Pet.prototype).toHaveProperty("increaseHunger");
      expect(typeof Pet.prototype.increaseHunger).toBe("function")
      expect(Pet.prototype).toHaveProperty("decreaseHunger");
      expect(typeof Pet.prototype.decreaseHunger).toBe("function")
   })

   it("should have increase and decrease fitness methods", () => {
      expect(Pet.prototype).toHaveProperty("increaseFitness");
      expect(typeof Pet.prototype.increaseFitness).toBe("function")
      expect(Pet.prototype).toHaveProperty("decreaseFitness");
      expect(typeof Pet.prototype.decreaseFitness).toBe("function")
   })

   it("should have a feed method", () => {
      expect(Pet.prototype).toHaveProperty("feed");
      expect(typeof Pet.prototype.feed).toBe("function")
   })

   it("should have a walk method", () => {
      expect(Pet.prototype).toHaveProperty("walk");
      expect(typeof Pet.prototype.walk).toBe("function")
   })

   it("should have a checkUp method", () => {
      expect(Pet.prototype).toHaveProperty("checkUp");
      expect(typeof Pet.prototype.checkUp).toBe("function")

   })

})

describe("an instance of Pet", () => {
   let Fluffy;

   beforeEach(() => {
      Fluffy = new Pet("Fluffy");
   })

   it("should get older by 1 every 10 seconds", () => {
      Fluffy.start();
      setTimeout( () => expect(Fluffy.age).toBe(2), 21000)
   })

   it("should lose 10 hunger points every 10 seconds", () => {
      Fluffy.start();
      setTimeout( () => expect(Fluffy.hunger).toBe(40), 11000)
   })

   it("should lose 5 fitness points every 10 seconds", () => {
      Fluffy.start();
      setTimeout( () => expect(Fluffy.fitness).toBe(45), 11000)
   })

   it("should gain 10 fitness points and get 10 points hungrier when walked", () => {
      Fluffy.walk();
      expect(Fluffy.fitness).toBe(60);
      expect(Fluffy.hunger).toBe(60);
   })

   it("should get 20 points less hungry and 5 points fitter when fed a carrot", () => {
      Fluffy.feed("carrot");
      expect(Fluffy.fitness).toBe(55);
      expect(Fluffy.hunger).toBe(30);
   })

   it("should get 5 points less hungry and 5 points less fit when fed a treat", () => {
      Fluffy.feed("treat");
      expect(Fluffy.fitness).toBe(45);
      expect(Fluffy.hunger).toBe(45);
   })

   it("should return an informative string when fed something that is not a carrot or a treat", () => {
      expect(Fluffy.feed("burger")).toEqual("I don't like burger. Please feed me a carrot or a treat!")
   })

   it("when checkUp is called, it should return a string reporting on how hungry and fit the pet feels", () => {
      expect(Fluffy.checkUp()).toEqual("I'm getting peckish, how about a snack? Also, I'm restless, let's go for a walk!");
   })

   it("the checkUp return string should change depending on the pet's levels", () => {
      Fluffy.hunger = 100;
      Fluffy.fitness = 100;
      expect(Fluffy.checkUp()).toEqual("I'm STARVING. Also, I'm PUMPED! I CAN DO ANYTHING!");

      Fluffy.hunger = 15;
      Fluffy.fitness = 73;
      expect(Fluffy.checkUp()).toEqual("I'm stuffed! Also, I feel STRONG");

      Fluffy.hunger = 65;
      Fluffy.fitness = 7;
      expect(Fluffy.checkUp()).toEqual("I'm getting hungry, is it dinner time? Also, I feel weak. Maybe I need to exercise?");

      Fluffy.hunger = 31;
      Fluffy.fitness =33;
      expect(Fluffy.checkUp()).toEqual("I'm perfectly satiated. Also, I don't feel so good, when did we last go for a walk?");
   })


})