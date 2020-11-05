function Pet(name) {
   this.name = name;
   this.age = 0;
}

Pet.prototype = {
   growUp () {
      setInterval( () => this.age++, 10000)
   }
}

module.exports = Pet;

// passing exports a module causes an error - the test doesn't receive it as a constructor


// set timeout on growup so that it is called after pet's initialization every 5 seconds