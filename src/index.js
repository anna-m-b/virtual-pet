function Pet(name) {
   this.name = name;
   
}

module.exports = Pet;

// passing exports a module causes an error - the test doesn't receive it as a constructor