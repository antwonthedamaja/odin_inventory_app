#! /usr/bin/env node

console.log(
  'This script populates some test items, authors, genres and iteminstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Genre = require("./models/genre");

const genres = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Action genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name, description) {
  const genre = new Genre({ name: name, description: description });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name} at index ${index}`);
}

async function itemCreate(name, description, condition, stock, genre, developer, platform, released) {
  const item = new Item({
    name: name,
    description: description,
    condition: condition,
    stock: stock,
    genre: genre,
    developer: developer,
    platform: platform,
    released: released
  });

  await item.save();
  console.log(`Added item: ${name}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "First-person shooter", "I must schüt the demons"),
    genreCreate(1, "Action/Adventure", "Take this! It's dangerous to go alone"),
    genreCreate(2, "Horror", 'Your mom would hate these games'),
    genreCreate(3, "Platformer", "Bing Bing Wahoo"),
    genreCreate(4, "RPG", "When your buds are not available for DnD night, these games will work instead"),
    genreCreate(5, "Stealth", "Hiding alone in the dark, just like my social life"),
    genreCreate(6, "Puzzle", "Brain-scratchers. And who said video-games couldn't improve your brainpower?")
  ]);
}

async function createItems() {
  console.log("Adding games");
  await Promise.all([
    itemCreate("Resident Evil 4", "The Original Survival Horror's most action-packed entry yet, are you a bad enough dude to rescue the President's daughter in this thrilling action-horror game?", 
    "Digital", "Digital store key", genres[2]._id, "Capcom", "PC", 2005),
    itemCreate("Resident Evil 4", "The Original Survival Horror's most action-packed entry yet, are you a bad enough dude to rescue the President's daughter in this thrilling action-horror game?", 
    "Used", "10", genres[2]._id, "Capcom", "PS2", 2005),
    itemCreate("Resident Evil 4", "The Original Survival Horror's most action-packed entry yet, are you a bad enough dude to rescue the President's daughter in this thrilling action-horror game?", 
    "New", "2", genres[2]._id, "Capcom", "PS2", 2005),
    itemCreate("Resident Evil 4", "The Original Survival Horror's most action-packed entry yet, are you a bad enough dude to rescue the President's daughter in this thrilling action-horror game?", 
    "Used", "6", genres[2]._id, "Capcom", "GameCube", 2005),
    itemCreate("Resident Evil 4", "The Original Survival Horror's most action-packed entry yet, are you a bad enough dude to rescue the President's daughter in this thrilling action-horror game?", 
    "New", "3", genres[2]._id, "Capcom", "GameCube", 2005),
    itemCreate("Morrowind", "The critically-acclaimed sequel to Arena and Daggerfall, enter the alien land of Morrowind and decide it's fate in this expansive, atmospheric masterpiece.", 
    "Digital", "Digital store key", genres[4]._id, "Bethesda", "PC", 2002),
    itemCreate("Metal Gear Solid", "A renegade special-forces unit named FOXHOUND is threatening to use Metal Gears, nuclear-warhead equipped bipedal mechas to launch a nuclear strike. You play as Solid Snake, legendary infiltrator and saboteur, as you must infiltrate the facility and stop the terrorists before it's too late.", 
    "Used", "11", genres[5]._id, "Konami", "PS1", 1998),
    itemCreate("Metal Gear Solid", "A renegade special-forces unit named FOXHOUND is threatening to use Metal Gears, nuclear-warhead equipped bipedal mechas to launch a nuclear strike. You play as Solid Snake, legendary infiltrator and saboteur, as you must infiltrate the facility and stop the terrorists before it's too late.", 
    "New", "2", genres[5]._id, "Konami", "PS1", 1998),
    itemCreate("God Hand", "The funnest, most campy beat-em-up action game available. You're not Alexander, or are you?", "Used", "6", genres[1]._id, "Capcom", "PS2", 2006),
    itemCreate("Super Mario Bros 3", "Play as Mario as he stomps turts through the Mushroom Kingdom. Perchance.", "New", "2", genres[3]._id, "Nintendo", "NES", 1988),
    itemCreate("Doom", `"No! I must kill the demons" he shouted. The radio said "No, John. You are the demons." And then John was a zombie.`, 
    "Digital", "Digital store key", genres[0]._id, "id Software", "PC", 1993),
    itemCreate("System Shock 2", "Play as a hacker running through corridors in this iconic amalgamation of sci-fi, survival-horror and action-roleplaying.", 
    "Digital", "Digital store key", genres[2]._id, "Looking Glass Studios", "PC", 1999),
    itemCreate("Thief: The Dark Project", "You play as Garrett, a cynical master thief who has become embroiled in a series of events of legendary events.", 
    "Digital", "Digital store key", genres[5]._id, "Looking Glass Studios", "PC", 1998),
    itemCreate("The Talos Principle", "This narrative-based puzzle game has the player taking the role of a robot with seemingly human consciousness inquires into the enigma of what makes a being truly conscious.", 
    "Digital", "Digital store key", genres[6]._id, "Croteam", "PC", 2014),
    itemCreate("Dark Souls", "Take control of the Chosen Undead, and decide whether to usher in a new Age of Fire or an Age of Dark in this dark fantasy universe.", 
    "Digital", "Digital store key", genres[1]._id, "FromSoftware", "PC", 2011)
  ]);
}