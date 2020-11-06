const MAX_AGE = 30, MAX_HUNGER = 100, MAX_FITNESS = 100;
const MIN_HUNGER = 0, MIN_FITNESS = 0;

function checkHunger(pet) {
   switch (true) {
    case pet.hunger > 80:
       return "I'm STARVING.";
       break;
    case pet.hunger > 60:
       return "I'm getting hungry, is it dinner time?";
       break;
    case pet.hunger > 40:
       return "I'm getting peckish, how about a snack?";
       break;
    case pet.hunger < 40 && pet.hunger > 20:
       return "I'm perfectly satiated.";
       break;
    case pet.hunger < 20:
       return "I'm stuffed!";
       break;
    default:
       return "Sorry, I don't quite know.";
   }
}

function checkFitness(pet) {
   switch(true) {
    case pet.fitness > 80:
      return "I'm PUMPED! I CAN DO ANYTHING!";
      break;
   case pet.fitness > 60:
      return "I feel STRONG";
      break;
   case pet.fitness > 40:
      return "I'm restless, let's go for a walk!";
      break;
   case pet.fitness < 40 && pet.fitness > 20:
      return "I don't feel so good, when did we last go for a walk?";
      break;
   case pet.fitness < 20:
      return "I feel weak. Maybe I need to exercise?";
      break;
   default:
      return "Sorry, I don't quite know";
 }
}

function Pet(name) {
   this.isAlive = true;
   this.name = name;
   this.age = 0;
   this.hunger = 50;
   this.fitness = 50;

   this.start();
}

Pet.prototype = {
   start () {
      setInterval( () => { 
         this.growUp()
         this.increaseHunger(15)
         this.decreaseFitness(10)
      }, 10000);
   },
   growUp () {
      this.age = (this.age + 1) === MAX_AGE ? MAX_AGE : this.age + 1;
    },
   decreaseHunger(amount) {
     this.hunger = (this.hunger - amount) <= MIN_HUNGER ? MIN_HUNGER : this.hunger - amount;
   },
   increaseHunger(amount) {
     this.hunger = (this.hunger + amount) >= MAX_HUNGER ? MAX_HUNGER : this.hunger + amount;
   },
   decreaseFitness(amount) {
      this.fitness= (this.fitness - amount) <= MIN_FITNESS ? MIN_FITNESS : this.fitness - amount;
   },
   increaseFitness(amount) {
     this.fitness = (this.fitness + amount) >= MAX_FITNESS ? MAX_FITNESS : this.fitness + amount;
   },
   walk() {
      this.increaseFitness(10);
      this.increaseHunger(10);
      return `What a beautiful day! My fitness level is now ${this.fitness} and my hunger level is now ${this.hunger}`
   },
   feed(food) {
      if (food === 'carrot') {
         this.decreaseHunger(20)
         this.increaseFitness(5) 
         return `Mmm veggies, thanks! My hunger level is now ${this.hunger} and my fitness level is now ${this.fitness}`
      } else if (food === 'treat') { 
         this.decreaseHunger(5)
         this.decreaseFitness(5)
         return `DELCIOUS treat, thanks! My hunger level is now ${this.hunger} and my fitness level is now ${this.fitness}`
      } else {
         return `I don't like ${food}. Please feed me a carrot or a treat!`;
      }
   },
   checkUp() {
      const fitness = checkFitness(this);
      const hunger = checkHunger(this);
      return `${hunger} Also, ${fitness}`;
   }
}


module.exports = Pet;

// passing exports a module causes an error - the test doesn't receive it as a constructor


// we need a function that takes care of the passing of the days