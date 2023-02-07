const artist = [
  "Jon Worthy",
  "Color Out",
  "Lisof",
  "Anitek",
  "TAB",
  "Glass Violet",
  "Sadme",
  "The Vow",
  "James Bell",
  "StimiBeats",
  "Nargo",
  "The Spin Wires",
  "MAKKENZIE",
  "House Of Dawn",
  "Makesound",
  "Samie Bower",
  "Carbon Casca",
  "Samie Bower",
  "Artistico",
  "LITTLE SUSPICIONS",
  "Kinematic",
  "All My Friends Hate Me",
  "Sam Opoku",
  "Arrow & Olive",
  "Rude",
  "Sunwill",
  "Other Noises",
  "Ocean Shiver",
  "Nothung",
  " Alexander Klein",
  "Smoking With Poets",
  "The Rabbitts",
  "Lower Loveday"
]

export const getRandomArtist = () => {
  const artistRand = artist[Math.floor(Math.random() * artist.length)];
  return `${artistRand}`;
}