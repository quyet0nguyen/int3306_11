/**
 * Table Schema: ClassSection
 * Descript: Hoc phan
 * ID           auto
 * Code         string
 * Name         string
 * CreditNumber number
 */

import Sequelize from "sequelize"
import db from '../config/database.mjs'

const ClassSection = db.define('class_sections', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    creditNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    }
})

export default ClassSection