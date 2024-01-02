const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

async function startSequelizing() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const Creator = sequelize.define('Creator', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    externalLink: {
        type: DataTypes.STRING
    }
});

const Video = sequelize.define('Video', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnailURL: {
        type: DataTypes.STRING
    },
    videoURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateCreated: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

(async () => {
    Creator.hasMany(Video);

    await sequelize.sync({});
})();

module.exports = { sequelize, startSequelizing, Creator, Video };