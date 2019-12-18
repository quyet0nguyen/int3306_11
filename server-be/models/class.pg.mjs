/**
 * Table Schema: Class
 * ID               auto
 * Lecture         string F key
 * Code             string P key 
 * ClassSectionCode foreignKey F key
 * TeacherCode      string
 * Day              number(enum: Day of week)
 * StartAt       number
 * HourNumber       number
 * RoomCode         foreignKey F key
 * RequireRoom      string(enum)
 */

import Sequelize from 'sequelize'
import db from '../config/database.mjs'
import Room from './room.pg.mjs'
import ClassSection from './class_section.pg.mjs'
import Account from './account.pg.mjs'

const Class = db.define('classes', {
    lecture: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
        }
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    classSectionCode: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
        }
    },
    teacherCode: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
        }
    },
    day: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
            isIn: [['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']]
        }
    },
    startAt: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
            min: 1,
            max: 12
        }
    },
    hourNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
            min: 1,
            max: 10
        }
    },
    roomCode: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
        }
    },
    requireRoom: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
            isIn: [['theory', 'practise']]
        }
    }
})

export default Class