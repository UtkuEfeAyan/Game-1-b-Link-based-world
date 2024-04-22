class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); //.... TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        this.engine.gatheredKey = 0;
        this.engine.locVisited = 0;
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // ....TODO: replace this text by the initial location of the story
    }
}


class Location extends Scene {
    create(key) {
        console.log("key:" + key);
        let locationData = this.engine.storyData.Locations[key]; // ....TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // ....TODO: replace this text by the Body of the location data
        
        console.log("locationData:", locationData);

    


        if (locationData.LockedKey == "Silver Key" ){
            this.engine.show(locationData.LockedKey + " gathered");
            this.engine.gatheredKey = 1;
        }
    
        if(locationData.Choices && locationData.Choices.length > 0) { // ....TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                console.log("Location Choice:", choice);
                // if (this.engine.keys.includes)
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        }
        if (this.engine.storyData.Locations[key].SpecialMechanism == true) {
            this.engine.locVisited = 1;

            // Implement the special mechanism directly within this method
            for(let choice of locationData.Choices){
            this.engine.show("You encounter a friendly dog. It wags its tail happily as you approach.");
            this.engine.addChoice("Pet the dog", choice, () => {;
            });
            }
        }
    
    }; 



    handleChoice(choice) {
        // Check if the choice leads to a locked location
        if (choice.Locked == true) {
           
            console.log("Choice:" , choice);
            console.log("Engine:", this.engine);
            console.log("Engine keys:", this.engine.keys);
            console.log("Engine gatheredKey:", this.engine.gatheredKey);

            // Check if the player has the key
            if ( this.engine.gatheredKey == 0) {
                console.log("OK");
// Unlock the exit and allow the player to proceed   // might need to be changed with choice.locked or something like that
                this.engine.show("you cannot go through the gate as the gate is closed");

                   // "Text": "South",
                   // "Target": "Cowell",
                   // "Locked": true
                
            } else {
                console.log(this.engine.gatheredKey);
                // Inform the player that they need the key to unlock the exit
                this.engine.show("You have used the Silver Key to unlock the pasasge that leads beyond the collage.");
                this.engine.show("The dog rolls over, enjoying the attention.");

                this.engine.gotoScene(Location, choice.Target);
            }

        }
        //&&  not choice.Locked) might be needed, dont know

            if(choice && choice.Locked == false) {
            // Move the player to the chosen location
            this.engine.show("> " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }else{
            this.engine.gotoScene(End);
        }
    }  
    
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');




           // if(choice) {                
         //       this.engine.show("> " + choice.Text);
         //       this.engine.gotoScene(Location, choice.Target);
           // } 
          //  else {
          //      this.engine.gotoScene(End);
          //  }
        