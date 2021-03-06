/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'qpon/homepage' },
  '/': 'QponController.home',
  'GET /qpon/create': 'QponController.create',
  'POST /qpon': 'QponController.create',
  'GET /qpon/admin': 'QponController.admin',
  'GET /qpon/update/:id': 'QponController.update',
  'PUT /qpon/:id': 'QponController.update',
  'DELETE /qpon/:id': 'QponController.delete',
  'GET /qpon/detail/:id': 'QponController.detail',
  'GET /qpon/search': 'QponController.search',
  'POST /qpon/search': 'QponController.search',

  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'GET /user/logout': 'UserController.logout',
  'GET /user/json': 'UserController.json',

  'POST /qpon/:id': 'QponController.redeem',
  'GET /qpon/my_coupons': 'QponController.list',
  'POST /qpon/my_coupons': 'QponController.list',
  'GET /qpon/owners/:qid': 'QponController.owners',
  

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
