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
  if (await Qpon.count() > 0) {
    return;
  }

  await Qpon.createEach([
    {
      title: "1$ Coffee",
      restaurant: "Coolest Cafe",
      region: "HK",
      image: "https://cdn.pixabay.com/photo/2015/05/15/14/55/cafe-768771_1280.jpg",
      quota: 100,
      coins: 1000,
      expire: 20201220,
      detail: "A coffee for only 1$!"
    },

    {
      title: "1$ Roasted salmon",
      restaurant: "Coolest Salmon",
      region: "HK",
      image: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg",
      quota: 80,
      coins: 500,
      expire: 20211220,
      detail: "A salmon for only 1$!"
    },

    {
      title: "1$ Pizza",
      restaurant: "Coolest Pizza",
      region: "HK",
      image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
      quota: 300,
      coins: 800,
      expire: 20221220,
      detail: "A pizza for only 1$!"
    },

    {
      title: "1$ Spaghetti",
      restaurant: "Coolest Spaghetti",
      region: "KL",
      image: "https://cdn.pixabay.com/photo/2015/07/27/19/44/spaghetti-863304_1280.jpg",
      quota: 200,
      coins: 998,
      expire: 20231220,
      detail: "A spaghetti for only 1$!"
    },

    {
      title: "1$ Burger",
      restaurant: "Coolest Burger",
      region: "KL",
      image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/abstract-1238247_1280.jpg",
      quota: 20,
      coins: 100,
      expire: 20241220,
      detail: "A burger for only 1$!"
    },

    {
      title: "1$ Beer",
      restaurant: "Coolest bar",
      region: "NT",
      image: "https://cdn.pixabay.com/photo/2015/09/02/12/35/bar-918541_1280.jpg",
      quota: 100,
      coins: 500,
      expire: 20251220,
      detail: "A beer for only 1$!"
    },
    // etc.
  ]);
};
