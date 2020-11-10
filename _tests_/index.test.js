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
      expect(fluffy).toHaveProperty("age", 0);
   })

   it(`should have a "hunger" property set to 5`, () => {
      expect(fluffy).toHaveProperty("hunger", 50)
   })

   it(`should have a "fitness" property set to 50`, () => {
      expect(fluffy).toHaveProperty("fitness", 50)
   })

   it(`should have a "children" property set to an empty array`, () => {
      expect(fluffy).toHaveProperty("children", [])
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

   it("should have a haveBaby method", () => {
      expect(Pet.prototype).toHaveProperty("haveBaby");
      expect(typeof Pet.prototype.haveBaby).toBe("function")
   })



})

describe("an instance of Pet", () => {
   let fluffy;
   let dayLength;

   beforeEach(() => {
      fluffy = new Pet("fluffy");
      dayLength = 10000;
      fluffy.start(dayLength)
   })
   
   jest.useFakeTimers();

   it("should get older by 1 point, hungrier by 5 points and 5 points less fit every day", () => {
      jest.advanceTimersByTime(dayLength);
      expect(fluffy.age).toBe(1);
      expect(fluffy.hunger).toBe(55);
      expect(fluffy.fitness).toBe(45);
   })

   it("the start method should throw an error if passed >= 5000 or a value other than a number", () => {
      expect( () => fluffy.start(0)).toThrow("the start method must be passed a number that is equal to or greater than 5000")
      expect( () => fluffy.start("")).toThrow("the start method must be passed a number that is equal to or greater than 5000")
   })

   it("should gain 10 fitness points and get 10 points hungrier when walked", () => {
      fluffy.walk();
      expect(fluffy.fitness).toBe(60);
      expect(fluffy.hunger).toBe(60);
   })

   it("should get 20 points less hungry and 5 points fitter when fed a carrot", () => {
      fluffy.feed("carrot");
      expect(fluffy.fitness).toBe(55);
      expect(fluffy.hunger).toBe(30);
   })

   it("should get 5 points less hungry and 5 points less fit when fed a treat", () => {
      fluffy.feed("treat");
      expect(fluffy.fitness).toBe(45);
      expect(fluffy.hunger).toBe(45);
   })

   it("the feed method should throw an error if no argument is received", () => {
      expect( () => fluffy.feed()).toThrow("You cannot feed your pet air: please try 'carrot' or 'treat'")
   })

   it("should return an informative string when fed something that is not a carrot or a treat", () => {
      expect(fluffy.feed("burger")).toEqual("I don't like burger. Please feed me a carrot or a treat!")
   })

   it("when checkUp is called, it should return a string reporting on how hungry and fit the pet feels", () => {
      expect(fluffy.checkUp()).toEqual("I'm getting peckish, how about a snack? Also, I'm restless, let's go for a walk!");
   })

   it("the checkUp return string should change depending on the pet's levels", () => {
      fluffy.hunger = 99;
      fluffy.fitness = 100;
      expect(fluffy.checkUp()).toEqual("I'm STARVING. Also, I'm PUMPED! I CAN DO ANYTHING!");

      fluffy.hunger = 15;
      fluffy.fitness = 73;
      expect(fluffy.checkUp()).toEqual("I'm stuffed! Also, I feel STRONG");

      fluffy.hunger = 65;
      fluffy.fitness = 7;
      expect(fluffy.checkUp()).toEqual("I'm getting hungry, is it dinner time? Also, I feel weak. Maybe I need to exercise?");

      fluffy.hunger = 31;
      fluffy.fitness =33;
      expect(fluffy.checkUp()).toEqual("I'm perfectly satiated. Also, I don't feel so good, when did we last go for a walk?");
   })

   it('never has a hunger value below min_hunger', () => {
      fluffy.hunger = MIN_HUNGER-5;
      jest.advanceTimersByTime(dayLength);
      expect(fluffy.hunger).toBe(MIN_HUNGER);
   })

   it(`should die when age hits ${MAX_AGE}`, () => {
      fluffy.age = MAX_AGE;  
      expect(fluffy.isAlive).toBe(false);    
   })

   it(`should die when hunger hits ${MAX_HUNGER}`, () => {
      fluffy.hunger = MAX_HUNGER;
      expect(fluffy.isAlive).toBe(false);
   })

   it(`should die when fitness hits ${MIN_FITNESS}`, () => {
      fluffy.fitness = MIN_FITNESS;
      expect(fluffy.isAlive).toBe(false);
   })

   it('should throw an error if pet is dead and user tries to interact with it', () => {
      fluffy.age = 30;
      expect( () => fluffy.walk()).toThrow('fluffy has moved on to the next realm and can no longer be played with :(')
      expect( () => fluffy.feed()).toThrow('fluffy has moved on to the next realm and can no longer be played with :(')
      expect( () => fluffy.checkUp()).toThrow('fluffy has moved on to the next realm and can no longer be played with :(')
      expect( () => fluffy.haveBaby('billy')).toThrow('fluffy has moved on to the next realm and can no longer be played with :(')
   })

   it("should be able to have babies", () => {
      fluffy.haveBaby('spot')
      expect(fluffy.children).toHaveLength(1);
      expect(fluffy.children[0]).toHaveProperty('name', 'spot')
   })

   it("the haveBaby method should throw an error if passed an empty string or a non-string value", () => {
      expect( () => fluffy.haveBaby("")).toThrow("Please pass in a valid name for the baby - this must be string and cannot be empty")
      expect( () => fluffy.haveBaby()).toThrow("Please pass in a valid name for the baby - this must be string and cannot be empty")
      expect( () => fluffy.haveBaby(5)).toThrow("Please pass in a valid name for the baby - this must be string and cannot be empty")
   })

})

