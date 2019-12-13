import RoomHelper from '../helpers/room.helper.mjs'
import fs from 'fs'
import XLSX from 'xlsx'

const create = (req, res) => {
    console.log(req.body)
    RoomHelper.create(req.body).then(result => {
        if(result.err) {
            console.error(result)
            res.json({
                success: false,
                data: null,
                message: "not ok!"
            })
            return
        }
        console.log(result.createdRoom)
        res.json({
            success: true,
            data: result.createdRoom,
            message: "ok"
        })
    })
}

const getAll = (req, res) => {
    RoomHelper.retrieveAll().then(result => {
        if(result.err) {
            console.error(result.err)
            res.json({
                success: false,
                data: null,
                message: "not ok"
            })
            return
        }
        console.log(result.rooms)
        res.json({
            data: result.rooms,
            success: true,
            message: "ok"
        })
    })
}

const update = (req, res) => {
    let id = parseInt(req.body.id)
    let infoUpdate = req.body

    RoomHelper.update(id, infoUpdate).then(result => {
        if(result.err) {
            console.error(result.err)
            res.json({
                success: false,
                data: null,
                message: "not ok"
            })
            return
        }
        console.log('ok')
        res.json({
            success: true,
            data: null,
            message: "ok"
        })
    })
}

const removeByID = (req, res) => {
    let id = parseInt(req.body.id)
    RoomHelper.remove(id).then(result => {
        if(result.err) {
            console.error(result.err)
            res.json({
                success: false,
                data: null,
                message: "not ok"
            })
            return
        }
        console.log('ok')
        res.json({
            success: true,
            data: null,
            message: "ok"
        })
    })
}

const importRooms = (req, res) => {
    if(!req.files.file) {
        res.status(400).json({
            status: false,
            message: 'None file',
            data: undefined
        })
        return
    }

    let file = req.files.file
    let fileName = req.files.file.name

    file.mv('./uploads/' + fileName, (err) => {
        if(err) {
            console.log('Erro saving')
            res.json({
                status: false,
                message: 'Error file',
                data: undefined
            })
            return
        } else {
            console.log('Saved: ./uploads/' + fileName)
            try {
                let workbook = XLSX.readFile(`./uploads/${fileName}`)
                let sheet_name_list = workbook.SheetNames
                let data = XLSX.utils.sheet_to_json(
                    workbook.Sheets[sheet_name_list[0]], 
                    {header: ["code", "type", "position", "capacity"]}
                )
                data.shift()

                let rooms = []
                data.forEach(item => {
                    rooms.push({
                        code: item.code,
                        type: item.type === 'TH' ? 'theory' : 'practise',
                        position: item.position,
                        capacity: parseInt(item.capacity)
                    })
                })

                try {
                    fs.unlinkSync(`./uploads/${fileName}`)
                } catch (e) {
                    console.log("error delete file")
                }

                RoomHelper.createMulti(rooms).then(result => {
                    res.json({
                        success: true,
                        message: "ok",
                        fault: result.err,
                        data: result.createdRooms
                    })
                })
            } catch (e) {
                console.log(e)
                res.json({
                    success: false,
                    message: "Servce can't read file",
                    data: undefined
                })
            }
        }
    })
}

const RoomController = {
    create,
    update,
    getAll,
    removeByID,
    importRooms
}

export default RoomController