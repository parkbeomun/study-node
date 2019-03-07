const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize,Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.Hashtag = require('./hashtag')(sequelize,Sequelize);

//1:N 의 경우 hashMany 와 belongsTo 로 연결
db.User.hasMany(db.Post); // 1:N
db.Post.belongsTo(db.User); // N:1
//시퀄라이즈는 Post table 에 userId 컬럼을 추가한다.

//post 와 hashtag 모델은 N:M 이다. 따라서 PostHashTag 이름으로 테이블을 자동 생성한다.
// 컬럼이름은 postId 와 HashtagId 이다.
db.Post.belongsToMany(db.Hashtag, { through:'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, { through:'PostHashtag'});

//같은 테이블간의 N:M 의 경우 ..

db.User.belongsToMany(db.User,{
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

module.exports = db;

/*
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
*/