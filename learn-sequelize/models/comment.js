/* 시퀄라이즈는 기본적으로 모델이름은 단수형으로, 테이블이름은 복수형으로 사용 */
/*
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment',{
        comment: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('now()'),
        }
    },{
        timestamps: false,
    });
};
*/
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comments', {
        comment: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('now()'),
        },
    }, {
        timestamps: false,
    });
};