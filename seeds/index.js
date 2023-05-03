const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 300; i++){
    const random1000 = Math.floor(Math.random()*1000);
    const price = Math.floor(Math.random()*20)+10;
    const camp = new Campground({
      // ---localhost---
      // author: '62e6bde5df5c5366267caaba',
      // ---online---
      // author: '6307aa48ac9056ee0df14c69',
      author: '6307aa48ac9056ee0df14c69',
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: { 
        type: 'Point', 
        coordinates: [ 
          cities[random1000].longitude,
          cities[random1000].latitude
         ] 
      },
      price,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium vitae magnam dignissimos beatae sequi et atque eos nihil maiores molestias facilis numquam blanditiis repudiandae, fugiat sunt, deserunt facere veniam tenetur.',
      images: [
        {
          url: 'https://res.cloudinary.com/dxwlrep6w/image/upload/v1661440759/YelpCamp/samplepic1_nb8mgu.jpg',
          filename: 'YelpCamp/samplepic1_nb8mgu.jpg',
        },
        {
          url: 'https://res.cloudinary.com/dxwlrep6w/image/upload/v1661440631/YelpCamp/samplepic2_ifdfyg.jpg',
          filename: 'YelpCamp/samplepic2_ifdfyg.jpg',
        },
        {
          url: 'https://res.cloudinary.com/dxwlrep6w/image/upload/v1661440630/YelpCamp/samplepic3_cttnxw.jpg',
          filename: 'YelpCamp/samplepic3_cttnxw.jpg',
        },
        {
          url: 'https://res.cloudinary.com/dxwlrep6w/image/upload/v1661440740/YelpCamp/samplepic4_xhunc8.jpg',
          filename: 'YelpCamp/samplepic4_xhunc8',
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})