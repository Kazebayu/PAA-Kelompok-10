import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Pers = db.define('perslist',{
    personalityName: DataTypes.STRING,
},{
    freezeTableName:true
})

export default Pers;

(async() => {
    await db.sync();
})();