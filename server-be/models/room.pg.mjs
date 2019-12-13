/**
 * Table Schema: Room
 * ID       auto
 * Code     string
 * Type     string(enum)
 * Position string
 * Capacity number
 */

import Sequelize from 'sequelize'
import db from '../config/database.mjs'

const Room = db.define('rooms', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        }
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
            isIn: [['theory', 'practise']]
        }
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    }
})

export default Room