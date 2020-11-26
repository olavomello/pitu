import {Sequelize} from "sequelize";

const sequelize = new Sequelize("mysql", "root", "112233", {
    host: "localhost",
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 100,
        min: 0,
        idle: 10000
    }
});

export default sequelize;