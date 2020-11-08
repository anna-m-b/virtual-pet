const MAX_AGE = 30, MAX_HUNGER = 100, MAX_FITNESS = 100;
const MIN_AGE = 0, MIN_HUNGER = 0, MIN_FITNESS = 0;

const causesOfDeath = {
   oldAge: `Your pet has passed away from old age 😢 They had a good run 😌`,
   illHealth: `Your pet has died due to lack of walks 😭 Take better care of your pets!`,
   hunger: `Your pet has died of starvation 😱 Take better care of your pets!`
};

const deadPetMessage = `has moved on to the next realm and can no longer be played with :(`

function Pet(name) {
   this.dayLength = 10000;
   this.name = name;
   this._age = 0;
   this._hunger = 50;
   this._fitness = 50;
   this._availableMethods = [`start()`, `walk()`, `feed('carrot')`, `feed('treat')`, `checkUp()`];
}

Pet.prototype = {
    start () {
      const dayPassing = setInterval( () => { 
         console.log(this.petStatus)
         if(!this.isAlive) {
            clearInterval(dayPassing)
            throw new Error(`${this.name} ${deadPetMessage}`);
         }
         this.growUp();
         this.increaseHunger(5);
         this.decreaseFitness(5);
         
      }, this.dayLength);
   },  
   get isAlive() {
      return this._age < MAX_AGE && this._hunger < MAX_HUNGER && this._fitness > MIN_FITNESS;
      },
   get petStatus() {
         if (this._age >= MAX_AGE) {
            return causesOfDeath.oldAge;
         } else if (this._hunger >= MAX_HUNGER) {
            return causesOfDeath.hunger;
         } else if (this._fitness <= MIN_FITNESS) {
            return causesOfDeath.illHealth;
         } else {
            return `${this.name} is live and kicking. Don't forget to checkUp on them!`
         }
      },
   growUp () {
      this._age = ((this._age + 1) >= MAX_AGE) ? MAX_AGE : this._age + 1;
    },
   decreaseHunger(amount) {
     this._hunger = ((this._hunger - amount) <= MIN_HUNGER) ? MIN_HUNGER : this._hunger - amount;
   },
   increaseHunger(amount) {
     this._hunger = ((this._hunger + amount) >= MAX_HUNGER) ? MAX_HUNGER : this._hunger + amount;
   },
   decreaseFitness(amount) {
      this._fitness = ((this._fitness - amount) <= MIN_FITNESS) ? MIN_FITNESS : this._fitness - amount;
   },
   increaseFitness(amount) {
     this._fitness = ((this._fitness + amount) >= MAX_FITNESS) ? MAX_FITNESS : this._fitness + amount;
   },
   walk() {
      if(!this.isAlive) {
         throw new Error(`${this.name} ${deadPetMessage}`);
      }
      this.increaseFitness(10);
      this.increaseHunger(10);
      return `What a beautiful day! My fitness level is now ${this._fitness} and my hunger level is now ${this._hunger}`
   },
   feed(food) {
      if(!this.isAlive) {
         throw new Error(`${this.name} ${deadPetMessage}`);
      }
      if (food === 'carrot') {
         this.decreaseHunger(20)
         this.increaseFitness(5) 
         return `Mmm veggies, thanks! My hunger level is now ${this._hunger} and my fitness level is now ${this._fitness}`
      } else if (food === 'treat') { 
         this.decreaseHunger(5)
         this.decreaseFitness(5)
         return `DELICIOUS treat, thanks! My hunger level is now ${this._hunger} and my fitness level is now ${this._fitness}`
      } else {
         return `I don't like ${food}. Please feed me a carrot or a treat!`;
      }
   },
   checkUp() {
      if(!this.isAlive) {
         throw new Error(`${this.name} ${deadPetMessage}`);
      }
      const fitness = checkFitness(this);
      const hunger = checkHunger(this);
      return `${hunger} Also, ${fitness}`;
   }
}

 
function checkHunger(pet) {
   switch (true) {
    case pet._hunger > 80: 
       return "I'm STARVING.";
       break;
    case pet._hunger > 60:
       return "I'm getting hungry, is it dinner time?";
       break;
    case pet._hunger > 40:
       return "I'm getting peckish, how about a snack?";
       break;
    case pet._hunger < 40 && pet._hunger > 20:
       return "I'm perfectly satiated.";
       break;
    case pet._hunger < 20:
       return "I'm stuffed!";
       break;
    default:
       return "Sorry, I don't quite know how hungry I am";
   }
}

function checkFitness(pet) {
   switch(true) {
      case pet._fitness > 80:
         return "I'm PUMPED! I CAN DO ANYTHING!";
         break;
      case pet._fitness > 60:
         return "I feel STRONG";
         break;
      case pet._fitness >= 40:
         return "I'm restless, let's go for a walk!";
         break;
      case pet._fitness < 40 && pet._fitness >= 20:
         return "I don't feel so good, when did we last go for a walk?";
         break;
      case pet._fitness < 20:
         return "I feel weak. Maybe I need to exercise?";
         break;
      default:
         return "Sorry, I don't quite know what my fitness level is";
  }
}





module.exports = { 
      Pet,
      MAX_AGE,
      MAX_HUNGER,
      MAX_FITNESS,
      MIN_AGE,
      MIN_HUNGER,
      MIN_FITNESS
}
      

