const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
main()
.then((res)=>{
    console.log("Connected to DB");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>
    ({...obj,owner:'6889ee709cc113167c7e0eec'}));
    await Listing.insertMany(initData.data);
    console.log("data was initalized");
};

initDB();


// // init/index.js
// const mongoose = require("mongoose");
// const Listing = require("../models/listing");
// const rawListings = require("./data").data;  // your sampleListings

// async function seed() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
//   await Listing.deleteMany({});

//   // flatten each item so `image` is the URL string, not an object
//   const flattened = rawListings.map(item => ({
//     title:       item.title,
//     description: item.description,
//     price:       item.price,
//     location:    item.location,
//     country:     item.country,
//     image:       item.image.url   // <-- pick out the URL
//   }));

//   await Listing.insertMany(flattened);
//   console.log("✅ Seeded listings with unique images!");
//   process.exit();
// }

// seed();
