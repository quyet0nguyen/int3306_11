import Sequelize from 'sequelize'

const db = new Sequelize('ManagementSystem', 'postgres', '2804', {
    host: 'localhost',
    dialect: 'postgres'
})

export default db