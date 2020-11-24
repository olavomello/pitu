import {Sequelize} from "sequelize";
// Connection
const sequelize = new Sequelize("mysql://root:112233@localhost:3306/pitu");

export default sequelize;