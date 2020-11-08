const { Pet, MAX_AGE, MAX_HUNGER, MAX_FITNESS, MIN_AGE, MIN_HUNGER, MIN_FITNESS } = require("../src/index.js");

describe("Pet constructor", () => {
   let fluffy;

   beforeEach(() => {
      fluffy = new Pet("fluffy");
   })


   it("should be defined", () => {
      expect(Pet).toBeDefined();
   });

   it("should return an object", () => {
      expect(fluffy).toBeInstanceOf(Object);
   });

   it(`should have a name property set to the passed argument`, () => {
     expect(fluffy).toHaveProperty("name", "fluffy");
   })

   it("should have an age property defaulted to 0", () => {
      expect(fluffy).toHaveProperty("_age", 0);
   })

   it(`should have a "hunger" property set to 5`, () => {
      expect(fluffy).toHaveProperty("_hunger", 50)
   })

   it(`should have a "fitness" property set to 50`, () => {
      expect(fluffy).toHaveProperty("_fitness", 50)
   })

 })


describe("Pet prototype", () => {

   it("should have a start method", () => {
      expect(Pet.prototype).toHaveProperty("start");
      expect(typeof Pet.prototype.start).toBe("function")
   })

   it("should have a getter property to check if pet is alive that returns true or false", () => {
      expect(Pet.prototype).toHaveProperty("isAlive");
      expect(typeof Pet.prototype.isAlive).toBe("boolean")
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

   it("should have a petStatus getter property that returns a string", () => {
      expect(Pet.prototype).toHaveProperty("petStatus");
      expect(typeof Pet.prototype.petStatus).toBe("string")
   })

})

describe("an instance of Pet", () => {
   let fluffy;

   beforeEach(() => {
      fluffy = new Pet("fluffy");
      fluffy.start()
   })
   
   jest.useFakeTimers();

   it("should get older by 1 point, hungrier by 5 points and 5 points less fit every day", () => {
      jest.advanceTimersByTime(fluffy.dayLength);
      expect(fluffy._age).toBe(1);
      expect(fluffy._hunger).toBe(55);
      expect(fluffy._fitness).toBe(45);
   })

   it("should gain 10 fitness points and get 10 points hungrier when walked", () => {
      fluffy.walk();
      expect(fluffy._fitness).toBe(60);
      expect(fluffy._hunger).toBe(60);
   })

   it("should get 20 points less hungry and 5 points fitter when fed a carrot", () => {
      fluffy.feed("carrot");
      expect(fluffy._fitness).toBe(55);
      expect(fluffy._hunger).toBe(30);
   })

   it("should get 5 points less hungry and 5 points less fit when fed a treat", () => {
      fluffy.feed("treat");
      expect(fluffy._fitness).toBe(45);
      expect(fluffy._hunger).toBe(45);
   })

   it("should return an informative string when fed something that is not a carrot or a treat", () => {
      expect(fluffy.feed("burger")).toEqual("I don't like burger. Please feed me a carrot or a treat!")
   })

   it("when checkUp is called, it should return a string reporting on how hungry and fit the pet feels", () => {
      expect(fluffy.checkUp()).toEqual("I'm getting peckish, how about a snack? Also, I'm restless, let's go for a walk!");
   })

   it("the checkUp return string should change depending on the pet's levels", () => {
      fluffy._hunger = 99;
      fluffy._fitness = 100;
      expect(fluffy.checkUp()).toEqual("I'm STARVING. Also, I'm PUMPED! I CAN DO ANYTHING!");

      fluffy._hunger = 15;
      fluffy._fitness = 73;
      expect(fluffy.checkUp()).toEqual("I'm stuffed! Also, I feel STRONG");

      fluffy._hunger = 65;
      fluffy._fitness = 7;
      expect(fluffy.checkUp()).toEqual("I'm getting hungry, is it dinner time? Also, I feel weak. Maybe I need to exercise?");

      fluffy._hunger = 31;
      fluffy._fitness =33;
      expect(fluffy.checkUp()).toEqual("I'm perfectly satiated. Also, I don't feel so good, when did we last go for a walk?");
   })

   it('never has a hunger value below min_hunger', () => {
      fluffy._hunger = MIN_HUNGER-5;
      jest.advanceTimersByTime(fluffy.dayLength);
      expect(fluffy._hunger).toBe(MIN_HUNGER);
   })

   it(`should die when age hits ${MAX_AGE}`, () => {
      fluffy._age = MAX_AGE;  
      expect(fluffy.isAlive).toBe(false);    
   })

   it(`should die when hunger hits ${MAX_HUNGER}`, () => {
      fluffy._hunger = MAX_HUNGER;
      expect(fluffy.isAlive).toBe(false);
   })

   it(`should die when fitness hits ${MIN_FITNESS}`, () => {
      fluffy._fitness = MIN_FITNESS;
      expect(fluffy.isAlive).toBe(false);
   })

   it('throw an error if pet is dead and user tries to interact with it', () => {
      fluffy._age = 30;
      expect( () => fluffy.walk()).toThrow('fluffy has moved on to the next realm and can no longer be played with :(')
      expect( () => fluffy.feed()).toThrow('fluffy has moved on to the next realm and can no longer be played with :(')
      expect( () => fluffy.checkUp()).toThrow('fluffy has moved on to the next realm and can no longer be played with :(')
   })

})

