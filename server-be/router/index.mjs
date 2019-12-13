import express from 'express'
import AccountController from '../controllers/account.controller.mjs'
import 'express-group-routes'
import RoomController from '../controllers/room.controller.mjs'
import ClassSectionController from '../controllers/class_section.controller.mjs'


const Router = express.Router()

Router.group('/account', r => {
    r.post('/', AccountController.create)
    r.get('/accounts', AccountController.getAll)
    r.put('/:id', AccountController.update)
    r.delete('/:id', AccountController.removeByID)
    r.post('/import/students', AccountController.importStudentAccounts)
    r.post('/import/lecturers', AccountController.importLecturerAccounts)

})


Router.group('/room', r => {
    r.post('/', RoomController.create)
    r.get('/rooms', RoomController.getAll)
    r.put('/:id', RoomController.update)
    r.delete('/:id', RoomController.removeByID)
    r.post('/import', RoomController.importRooms)
})

Router.group('/class-section', r => {
    r.post('/', ClassSectionController.create)
    r.get('/class-sections', ClassSectionController.getAll)
    r.put('/:id', ClassSectionController.update)
    r.delete('/:id', ClassSectionController.removeByID)
    r.post('/import', ClassSectionController.importClassSections)
})

export default Router