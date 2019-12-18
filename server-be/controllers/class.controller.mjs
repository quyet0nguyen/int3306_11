import ClassHelper from '../helpers/class.helper.mjs'
import XLSX from 'xlsx'
import fs from 'fs'

const create = (req, res) => {
    console.log(req.body)
    ClassHelper.create(req.body).then(result => {
        if(result.err) {
            console.error(result)
            res.json({
                success: false,
                data: null,
                message: "not ok!"
            })
            return
        }
        res.json({
            success: true,
            data: result.createdClass,
            message: "ok"
        })
    })
}

const getAll = (req, res) => {
    ClassHelper.retrieveAll().then(result => {
        if(result.err) {
            console.error(result.err)
            res.json({
                success: false,
                data: null,
                message: "not ok"
            })
            return
        }
        res.json({
            data: result.classes,
            success: true,
            message: "ok"
        })
    })
}

const getClassRunning = (req, res) => {
    ClassHelper.classRunning().then(result => {
        if(result.err) {
            console.error(result.err)
            res.json({
                success: false,
                data: null,
                message: "not ok"
            })
            return
        }
        res.json({
            data: result.classes,
            success: true,
            message: "ok"
        })
    })
}

const update = (req, res) => {
    let id = parseInt(req.body.id)
    let infoUpdate = req.body
    ClassHelper.update(id, infoUpdate).then(result => {
        if(result.err) {
            console.error(result.err)
            res.json({
                success: false,
                data: null,
                message: "not ok"
            })
            return
        }
        res.json({
            success: true,
            data: null,
            message: "ok"
        })
    })
}

const removeByID = (req, res) => {
    let id = parseInt(req.body.id)
    ClassHelper.remove(id).then(result => {
        if(result.err) {
            console.error(result.err)
            res.json({
                success: false,
                data: null,
                message: "not ok"
            })
            return
        }
        res.json({
            success: true,
            data: null,
            message: "ok"
        })
    })
}

const importClass = (req, res) => {

}

const ClassController = {
    create,
    update,
    getAll,
    getClassRunning,
    removeByID,
    importClass
}

export default ClassController