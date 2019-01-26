/*
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/
/*
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development'; //배포환경에서 이부분을 수정 그다음 config.js 수정
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config) ;

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db 객체에 User와 Comment 모델을 담아 해당 모델에 접근할 수 있다.
db.User = require('./user')(sequelize, Sequelize);
db.Comment= require('./comment')(sequelize, Sequelize);

//테이블간의 관계를 파악해서 commenter 컬럼을 추가하고, 외래키도 추가
db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey:'id'});
db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey:'id'});

module.exports = db;
*/
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });

module.exports = db;
