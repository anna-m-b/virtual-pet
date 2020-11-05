const Pet = require('../src/index.js');

describe('Pet', () => {
   it('should be defined', () => {
      expect(Pet).toBeDefined();
   });

   it('should return an object', () => {
      expect(new Pet('Fluffy')).toBeInstanceOf(Object);
  });

  it('should have a name', () => {
     expect(new Pet('Fluffy')).toHaveProperty('name', 'Fluffy');
  })
})

