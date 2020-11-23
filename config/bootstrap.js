/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  sails.bcrypt = require("bcryptjs");

  if (await Qpon.count() == 0) {
    await Qpon.createEach([
      {
        title: "1$ Coffee",
        restaurant: "Coolest Cafe",
        region: "HK",
        mall: "IFC Mall",
        image: "https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_1280.jpg",
        quota: 100,
        coins: 1000,
        expire: "2020-12-20",
        detail: "A coffee for only 1$!"
      },

      {
        title: "1$ Roasted salmon",
        restaurant: "Coolest Salmon",
        region: "HK",
        mall: "Pacific Place",
        image: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg",
        quota: 80,
        coins: 500,
        expire: "2021-12-20",
        detail: "A salmon for only 1$!"
      },

      {
        title: "1$ Pizza",
        restaurant: "Coolest Pizza",
        region: "HK",
        mall: "Time Square",
        image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
        quota: 300,
        coins: 800,
        expire: "2022-12-20",
        detail: "A pizza for only 1$!"
      },

      {
        title: "1$ Spaghetti",
        restaurant: "Coolest Spaghetti",
        region: "KL",
        mall: "Elements",
        image: "https://cdn.pixabay.com/photo/2015/07/27/19/44/spaghetti-863304_1280.jpg",
        quota: 200,
        coins: 998,
        expire: "2023-12-20",
        detail: "A spaghetti for only 1$!"
      },

      {
        title: "1$ Burger",
        restaurant: "Coolest Burger",
        region: "KL",
        mall: "Harbour City",
        image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/abstract-1238247_1280.jpg",
        quota: 20,
        coins: 100,
        expire: "2024-12-20",
        detail: "A burger for only 1$!"
      },

      {
        title: "1$ Beer",
        restaurant: "Coolest bar",
        region: "NT",
        mall: "MegaBox",
        image: "https://cdn.pixabay.com/photo/2015/09/02/12/35/bar-918541_1280.jpg",
        quota: 100,
        coins: 500,
        expire: "2025-12-20",
        detail: "A beer for only 1$!"
      },
      // etc.
    ]);
  }

  var salt = await sails.bcrypt.genSalt(10);
  var hash = await sails.bcrypt.hash('1234', salt);

  if (await User.count() == 0) {
    await User.createEach([
      {
        username: "admin",
        password: hash,
        usertype: "admin",
        coins: 0
      },

      {
        username: "martin",
        password: hash,
        usertype: "member",
        coins: 500
      },

      {
        username: "kenny",
        password: hash,
        usertype: "member",
        coins: 1000
      },
    ])
  }
}