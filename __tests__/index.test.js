const Pet = require('../src/index.js');

describe('Pet', () => {
   it('should be defined', () => {
      expect(Pet).toBeDefined();
   });

   it('should return an object', () => {
      expect(new Pet('Fluffy')).toBeInstanceOf(Object);
  });
})

