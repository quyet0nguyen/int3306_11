/**
 * Table Schema: RequestForm
 * ID           auto
 * Title        string
 * Content      string
 * RoomCode     string
 * BeginTime    datetime
 * EndTime      datetime
 * Status       string(enum of status: waiting, cancled, checked, accepted)
 * AppliedBy    string(=username)
 * Response     string
 * CreatedBy    string(=username)
 * CreatedAt    date
 * AppliedAt    date
 */

import Sequelize from 'sequelize'
import db from '../config/database.mjs'
import Account from './account.pg.mjs'

 const RequestForm = db.define('request_forms', {
    title: {
        type: Sequelize.STRING(1023),
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    roomCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    beginTime: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    endTime: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
            isIn: [['waiting', 'checked', 'canceled', 'accepted']]

        }
    },
    createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true
        },
        references: {
            model: Account,
            key: 'username'
        }
    },
    appliedBy: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false
        },
        references: {
            model: Account,
            key: 'username'
        }
    },
    appliedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false
        }
    },
    response: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false,
        validate: {
            notEmpty: false
        }
    }
 })

 export default RequestForm