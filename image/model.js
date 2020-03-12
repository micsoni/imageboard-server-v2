const Sequelize = require("sequelize");
const db = require("../db.js");
const User = require("../user/model")

const Image = db.define("image", {
  url: Sequelize.STRING,
  title: Sequelize.STRING
});

Image.belongsTo(User);

User.hasMany(Image)

module.exports = Image;
