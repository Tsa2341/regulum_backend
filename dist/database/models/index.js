'use strict';

var fs = require('fs');

var path = require('path');

var Sequelize = require('sequelize');

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../config/config.js')[env];

var db = {};
var sequelize;

if (env === 'development') {
  sequelize = new Sequelize(process.env.DEV_DB);
} else if (env === 'test') {
  sequelize = new Sequelize(process.env.TEST_DB);
} else {
  sequelize = new Sequelize(process.env.PROD_DB);
}

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
module.exports = db;