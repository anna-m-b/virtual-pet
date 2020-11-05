const Pet = require('../src/index.js');

describe('Pet', () => {

   let Fluffy;

   beforeEach(() => {
      Fluffy = new Pet('Fluffy');
   })

   it('should be defined', () => {
      expect(Pet).toBeDefined();
   });

   it('should return an object', () => {
      expect(Fluffy).toBeInstanceOf(Object);
   });

   it('should have a name', () => {
     expect(Fluffy).toHaveProperty('name', 'Fluffy');
   })

   it('should have an age property defaulted to 0', () => {
      expect(Fluffy).toHaveProperty('age', 0);
   })

   it('should have a growUp method set on the prototype', () => {
      expect(typeof Fluffy.__proto__.growUp).toBe('function')
   })

   it('should get older by 1 every 10 seconds', () => {
      Fluffy.growUp();
      setTimeout( () => expect(Fluffy.age).toBe(2), 21000)
   })

})

