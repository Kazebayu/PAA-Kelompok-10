import { Sequelize } from "sequelize";

const db = new Sequelize('mypersonality','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db;