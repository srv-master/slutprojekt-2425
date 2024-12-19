



mongoose.connect("mongodb://localhost:27017/prov");
mongoose.connection
  .on("open", () => console.log("mongoose är kopplat till provdatabasen"))
  .on("error", (error) => console.log("Säg till Johan", error));

// konstanter att arbeta med till pug
const boss = "Johan";
let lotteryNumbers = [1,2,3,4,5,6,7,8,9,10];

// dessa behövs för e-nivå men c-nivå hämtar från databas istället
const cats = [
    {
        name: "Bajsen",
        age: 7,
        race: "Gatukorsning",
      },
      {
        name: "Örat",
        age: 2,
        race: "Nakenkatt",
      },
      {
        name: "Mulle",
        age: 17,
        race: "Förmodligen en tvättbjörn",
      },
      {
        name: "Majsan",
        age: 4,
        race: "Bondkatt",
      },
]