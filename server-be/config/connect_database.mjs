import db from './database.mjs'
import Account from '../models/account.pg.mjs'
import Room from '../models/room.pg.mjs'
import ClassSection from '../models/class_section.pg.mjs'
import Class from '../models/class.pg.mjs'
import RequestForm from '../models/request_form.pg.mjs'

const connect = () => {
    db.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
            Room.sync()
            Account.sync()
            ClassSection.sync()
            Class.sync()
          	RequestForm.sync()
        })
        .catch(err => {
            console.log('Unabale to connect to the database: ', err)
        })
}


export default connect

