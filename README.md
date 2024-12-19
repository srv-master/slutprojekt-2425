# Slutprojekt websrv1

Webbserverprogrammering 1, 24/25, wesweb01  
Uppdaterad 2024-12-19

Du ska skapa en webbsajt som drivs av data på något sätt. Det kan vara en blogg, en eventsida eller ett produktregister men gemensamt för dem är att de drivs av en databas som innehåller all data. Oavsett vad du väljer så är det hur du gör det som spelar mest roll. 

**För att klara uppgiften och kursen så räcker det med grundläggande funktionalitet** (alltså att kunna hämta data och visa den) men för **de högre betygen** behöver du själv resonera kring vilken funktionalitet som vore intressant att **utvidga projektet** med. Exempelvis kan en blogg utvidgas med kommentarer, taggar, validering, moderering, filuppladdning, behörighetsnivåer, privata meddelanden, notiser, achievements, sökfunktioner, filter, tema, statistik, login via Google eller andra och mycket mycket mer. 

## Kunskapskrav och bedömning

### Arkitektur

|  | E | C | A |
| :---- | :---- | :---- | :---- |
| Du separerar kod med olika roller från varandra, ex modeller eller route-filer |  | delvis | på ett bra sätt |
| Du arbetar med vyer i Express | delvis | genomgående | genomgående |

### Funktionalitet

|  | E | C | A |
| :---- | :---- | :---- | :---- |
| Du hanterar grunderna i Express | hjälpligt | väl |  |
| Du hanterar mer avancerad funktionalitet, ex  validering och  felhantering eller autentisering och inloggning.  |  | delvis | på ett bra sätt |

### Databaser

|  | E | C | A |
| :---- | :---- | :---- | :---- |
| Du kan hämta data från db | på något sätt | på bra sätt | på bra sätt och med mer avancerade frågor |
| Du kan lägga till, redigera och ta bort |  | delvis | på bra sätt |
| Du kan strukturera en databas / collection |  | ok | väl |

### Kvalitet

|  | E | C | A |
| :---- | :---- | :---- | :---- |
| Du strukturerar dina filer | någorlunda | väl |  |
| Du namnger filer, variabler och funktioner | acceptabelt | väl | så tydligt att kommentarer inte behövs |
| Du följer best practice för kodstandard |  | delvis | helt eller motiverar avsteg |
| Du skriver kod som är | enkel men fungerande | fungerande | effektiv |
| Du kommenterar din kod där det behövs | enkelt |  | koden är så bra skriven att enbart DocBlock behövs för egna funktioner |





# Cheat Sheet Webbserverprogrammering

## connecta till lokal MongoDB
- I index.js finns redan koden du behöver
- För MongoDB extension så klicka på connection string och ange: mongodb://localhost:27017/
- Kör filen assets/preppa-provet.mongodb.js efter att du anslutit MongoDB Extension

# node

```javascript
npm init
npm install express pug morgan mongoose
npm install nodemon -g
```

# express

Middleware som du typ alltid vill använda

```javascript
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public")));
```

# Mongoose

Installera 

```javascript
npm install mongoose
```

Koppla mot MongoDB

```javascript
const mongoose = require("mongoose");

const uri = `mongodb+srv://username:password@atlas-free.hd5avdu.mongodb.net/database?retryWrites=true&w=majority`;
mongoose.connect(uri);
mongoose.connection
  .on("open", () => console.log("mongoose is connected"))
  .on("close", () => console.log("mongoose is disconnected"))
  .on("error", (error) => console.log(error));
```

mongoose.connection.useDb('myDB');

Placering av filer

```javascript
/models/Demo.js
```

Skapa schema

```javascript
const mongoose = require('mongoose');
const demoSchema = new mongoose.Schema({
    text1: { type: String,   },
    num1: {  type: Number    },
});

const Demo = mongoose.model('Demo', demoSchema);
module.exports = Demo;
```

Ta in med require

```javascript
const Demo = require("./models/Demo.js");
```

find(), findOne()

```javascript
const demo = async () => {
  let demodata = await Demo.find();
  console.log(demodata);
};
demo();
```

findById()

```javascript
const demo = async (id) => {
  let demodata = await Demo.findById(id);
  console.log(demodata);
};
demo('65265da40dd4cdb906661e0e');
```

filter med find()

```javascript
const demo = async () => {
  let demodata = await Demo.findOne();
  console.log(demodata);
};
demo();
```

find med filterObject och selectObject

```javascript
// välj studenter på TE och visa enbart för- och efternamn
Student.find(
  { programme: "TE" }, 
  { firstName: 1, lastName: 1 } 
)
```

Nu är det lite lättare och du borde se ungefär detta: 

.where och hjälpfunktioner

```javascript
const demo = async () => {
  let demodata = await Demo.find().
	where('num1').gt(3);
  console.log(demodata);
};
demo();
```

Hjälpfunktioner i Mongoose istället för MongoDB:s inbyggda

```javascript
.equals()
.gt(), .lt(), .gte(), .lte()
.in(), .nin(), .ne()
.and(), .or(), .not(), .nor()
.exists()
.type()
.regex()
```

create()

```javascript
const demo = async () => {
  let demodata = await Demo.create({
   text1: "Pinnar",
    num1: 4
  });
};
demo();
```

updateOne()

```javascript
const demo = async (id, text1, num1) => {
  await Demo.updateOne(
    { _id: id },
    { 	
      text1: text1, 
      num1: num1
    }
  );
};
demo();
```

# Pug

Ställ in som renderingsmotor i Express

```javascript
app.set("view engine", "pug"); 
app.set("views", "./views");
```

Placering av vy-filer

```
/views/demo.pug
/views/notes/all.pug
/views/notes/new.pug
```

Rendera vy

```javascript
app.get("/", (req, res) => {
  res.render("demo", { namn: "Johan" });
});

app.get("/notes/new", (req, res) => {
  // kod för att hämta data till variabeln notes
  res.render("notes/new", { title: "Demo", notes: notes, numbers: [1,2,3] });
});
```

Taggar och attribut

```javascript
form(action="/demo", method="POST")
	label(for="name") Vad heter du?
input(type="text", id="name", name="name")

.parent
.child 
p Lorem...
p Color...
.child 
p Dolores ...
```

Utskrift av variabel som skickats in

```javascript
h1 Du heter #{name}!
h1= name
```

Tagg inline i text

```javascript
p Surfa till #[a(href="/cars/") alla bilar] och börja om.
p Surfa till #[a(href="https://www.expressen.se") Expressen] och läs något.
```

Loopar

```javascript
each number in numbers
p #{number}
```

Villkor

```javascript
if namn
	h1 Hej #{name}!
else
	h1 Vad heter du?
```

