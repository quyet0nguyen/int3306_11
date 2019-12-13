/**
 * Table Schema: Class
 * ID               auto
 * Code             string
 * StudentNumber    number
 * ClassSectionCode foreignKey
 * RoomCode         foreignKey
 * Semester         string
 * Day              number(enum: Day of week)
 * StartTime        number
 * HourNumber       number
 * RequireRoom      string(enum)
 * Students         array<string> (studentCode = username)
 * Lecturer         string (LecturerCode = username)
 */

import Sequelize from 'sequelize'
import db from '../config/database.mjs'
import Room from './room.pg.mjs'
import ClassSection from './class_section.pg.mjs'
import Account from './account.pg.mjs'

const Class = db.define('classes', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    studentNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false
        }
    },
    semester: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
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
    startTime: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
            min: 6,
            max: 22
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
    students: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false
        }
    },
    lecturer: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
        },
        references: {
            model: Account,
            key: 'username'
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
    },
    roomCode: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
        },
        references: {
            model: Room,
            key: 'code'
        }
    },
    classSectionCode: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false,
        },
        references: {
            model: ClassSection,
            key: 'code'
        }
    }
})

export default Class