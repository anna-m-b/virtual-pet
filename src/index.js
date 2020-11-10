const MAX_AGE = 30, MAX_HUNGER = 100, MAX_FITNESS = 100;
const MIN_AGE = 0, MIN_HUNGER = 0, MIN_FITNESS = 0;

const causesOfDeath = {
   oldAge: `has passed away from old age 😢 They had a good run 😌`,
   illHealth: `has died due to lack of walks 😭 Take better care of your pets!`,
   hunger: `has died of starvation 😱 Take better care of your pets!`
};

const deadPetMessage = `has moved on to the next realm and can no longer be played with :(`

function Pet(name) {
   this.name = name;
   this.age = 0;
   this.hunger = 50;
   this.fitness = 50;
   this.children = [];
   this.availableMethods = `start(length-of-day), walk(), feed('carrot'), feed('treat'), checkUp(), haveBaby('name')`;
}

Pet.prototype = {
    start(dayLength) {
      if (typeof(dayLength) !== "number" || dayLength < 5000) {
         throw new Error("the start method must be passed a number that is equal to or greater than 5000");
      }
      if(!this.isAlive) {
         throw new Error(`${this.name} ${deadPetMessage}`);
      } else {
         const dayPassing = setInterval( () => { 
            console.log(this.petStatus)
            if(!this.isAlive) {
               clearInterval(dayPassing)
               throw new Error(`${this.name} ${deadPetMessage}`);
            }
            this.growUp();
            this.increaseHunger(5);
            this.decreaseFitness(5);
            
         }, dayLength); 
      }
   },
   get isAlive() {
      return this.age < MAX_AGE && this.hunger < MAX_HUNGER && this.fitness > MIN_FITNESS;
      },
   get petStatus() {
         if (this.age >= MAX_AGE) {
            return `${this.name} ${causesOfDeath.oldAge}`;
         } else if (this.hunger >= MAX_HUNGER) {
            return `${this.name} ${causesOfDeath.hunger}`;
         } else if (this.fitness <= MIN_FITNESS) {
            return `${this.name} ${causesOfDeath.illHealth}`;
         } else {
            return `${this.name} is alive and kicking. Don't forget to checkUp on them!`
         }
      },
   growUp () {
      this.age = ((this.age + 1) >= MAX_AGE) ? MAX_AGE : this.age + 1;
    },
   decreaseHunger(amount) {
     this.hunger = ((this.hunger - amount) <= MIN_HUNGER) ? MIN_HUNGER : this.hunger - amount;
   },
   increaseHunger(amount) {
     this.hunger = ((this.hunger + amount) >= MAX_HUNGER) ? MAX_HUNGER : this.hunger + amount;
   },
   decreaseFitness(amount) {
      this.fitness = ((this.fitness - amount) <= MIN_FITNESS) ? MIN_FITNESS : this.fitness - amount;
   },
   increaseFitness(amount) {
     this.fitness = ((this.fitness + amount) >= MAX_FITNESS) ? MAX_FITNESS : this.fitness + amount;
   },
   walk() {
      if(!this.isAlive) {
         throw new Error(`${this.name} ${deadPetMessage}`);
      }
      this.increaseFitness(10);
      this.increaseHunger(10);
      return `What a beautiful day! My fitness level is now ${this.fitness} and my hunger level is now ${this.hunger}`
   },
   feed(food) {
      if(!this.isAlive) {
         throw new Error(`${this.name} ${deadPetMessage}`);
      }
      if(!food) {
         throw new Error("You cannot feed your pet air: please try 'carrot' or 'treat'")
      }
      if (food === 'carrot') {
         this.decreaseHunger(20)
         this.increaseFitness(5) 
         return `Mmm veggies, thanks! My hunger level is now ${this.hunger} and my fitness level is now ${this.fitness}`
      } else if (food === 'treat') { 
         this.decreaseHunger(5)
         this.decreaseFitness(5)
         return `DELICIOUS treat, thanks! My hunger level is now ${this.hunger} and my fitness level is now ${this.fitness}`
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
   },
   haveBaby(name) {
      if(!this.isAlive) {
         throw new Error(`${this.name} ${deadPetMessage}`);
      }
      if(!name || typeof(name) !== "string") {
         throw new Error("Please pass in a valid name for the baby - this must be string and cannot be empty")
      }
      this.children.push(new Pet(name))
   }
}

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
       return "Sorry, I don't quite know how hungry I am";
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
      case pet.fitness >= 40:
         return "I'm restless, let's go for a walk!";
         break;
      case pet.fitness < 40 && pet.fitness >= 20:
         return "I don't feel so good, when did we last go for a walk?";
         break;
      case pet.fitness < 20:
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
      

