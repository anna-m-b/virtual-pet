
# Virtual Pet -  a JavaScript project

At bootcamp, we are learning about **OOP** in JavaScript. To help us grasp these concepts our task is to build a **virtual pet**. I'm feeling nostalgic for my old tamagotchi now.

We are also learning **TDD**. This project will come with a full test suite written in **Jest**.

### How can you interact with this virtual pet?

- [x]  You can give them a name
- [x]  They can get older
- [x]  As they get older, they get hungrier and less fit
- [x]  You can walk your pet to increase its fitness. 🏃‍♂️
- [x]  You can feed your pet to decrease its hunger. 🍕
- [x]  You can talk to your pet to see if it needs feeding or walking
- [x]  If your pet gets too hungry or unfit, it will DIE 💀
- [x]  If your pet gets to 30 days old it will DIE 😢

*Feature list taken from the Manchester Codes dashboard*


***

## Getting Started

### Pre-requisites
If you'd like to play with your very own JavaScript pet, you'll need Node.js installed on your machine.
First, check if you already have Node.js and npm installed. Open your terminal and run:

      node -v
      npm -v

If you get something like 'v14.7.0' and '6.14.7' congratualtions! You already have node and npm.
If not, jump to [npmjs](https://www.npmjs.com/get-npm) and download Node.js from there (npm is bundled with it).


### Installing
Once you have Node.js, fork this repo then clone your forked version onto your machine.

In the project directory in terminal run `npm i`. This will install the project dependencies on your machine. In this case, that means Jest, which we use for testing.

### Create a pet
In your terminal, in the project directory, enter into the node REPL by running the command `node`.

The first thing you need to do is import the index.js file. Enter the following in your terminal:

`$ const { Pet } = require('./src/index.js')`

Now you're ready to create your pet! You can do this as below, replacing both instances of 'yourPetName' with the name you want to call your pet. 

`$ const yourPetName = new Pet('yourPetName')`

Enter yourPetName into the terminal and you should see:

      {
      dayLength: 10000,
      name: 'yourPetName',
      _age: 0,
      _hunger: 50,
      _fitness: 50,
      _availableMethods: [ 'start()', 'walk()', "feed('carrot')", "feed('treat')", 'checkUp()' ]
      }


dayLength corresponds to the amount of time a day takes, in milliseconds. With each day that passes, your pet's age will increase by 1, its hunger level by 5 and its fitness level will decrease by 5. 

Your pet will die if
- it reaches 30 days old
- its hunger level reaches 100
- its fitness level falls to 0


Before beginning the day cycle, you have the option of changing the dayLength. For example:

`$ yourPetName.dayLength = 20000`

Now, each day will be 20 seconds long.

When you're happy with the day length call start() to get things going:

`$ yourPetName.start()`

To prevent your getting hungry and unfit, you can walk and feed your pet as shown in the avaiableMethods property. You can also see how your pet is doing and get a hint as to what it might need by calling checkUp:

`$ yourPetName.checkUp()`

Example output: `"I'm getting peckish, how about a snack? Also, I'm restless, let's go for a walk!"`

Try walking and feeding your pet. How does it respond?


*Note* 
The underscore preceding age, hunger and fitness and availableMethods indicates that these properties shouldn't be manipulated directly.


***
## Running the tests 
Open up the project directory in your favourite code editor. Take a look in the tests directory to see all the tests written for the virtual pet code so far. They're grouped into 3 describe blocks, one for the constructor, one for the prototype and one for an instance of Pet.

In your terminal run:

`$ npm t`

Look at all those green ticks! So satisfying! 


*** 

## Now you're all set up.
What would you change about this virtual pet project? What features would you like to add? Go ahead and get stuck in!
*** 

## Authors 
Anna Balquin
***

## Acknowledgements
Of course, [Manchester Codes](https://www.manchestercodes.com), who designed this project.
***