import ClassSectionHelper from '../helpers/class_section.helper.mjs'
import XLSX from 'xlsx'
import fs from 'fs'


const create = (req, res) => {
    console.log(req.body)
    ClassSectionHelper.create(req.body).then(result => {
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
            data: result.createdClassSection,
            message: "ok"
        })
    })
}

const getAll = (req, res) => {
    ClassSectionHelper.retrieveAll().then(result => {
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
            data: result.classSections,
            success: true,
            message: "ok"
        })
    })
}

const update = (req, res) => {
    let id = parseInt(req.body.id)
    let infoUpdate = req.body
    ClassSectionHelper.update(id, infoUpdate).then(result => {
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
    ClassSectionHelper.remove(id).then(result => {
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

const importClassSections = (req, res) => {
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
    
    file.mv(`./uploads/${fileName}`, err => {
        if(err) {
            console.log("error saving")
            res.json({
                status: false,
                message: "erro file",
                data: undefined
            })
            return
        }

        console.log("Saved: ./uploads/" + fileName)

        try {
            let workbook = XLSX.readFile(`./uploads/${fileName}`)
            let sheet_name_list = workbook.SheetNames
            let data = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheet_name_list[0]],
                {header: ["id", "code", "name", "creditNumber"]}
            )
            data.shift()

            let classSections = []
            data.forEach(item => {
                classSections.push({
                    code: item.code,
                    name: item.name,
                    creditNumber: parseInt(item.creditNumber)
                })
            })

            try {
                fs.unlinkSync(`./uploads/${fileName}`)
            } catch (e) {
                console.log("error delete file")
            }

            ClassSectionHelper.createMulti(classSections).then(result => {
                res.json({
                    success: true,
                    message: "ok",
                    fault: result.err,
                    data: result.createdClassSections
                })
            })
        } catch(e) {
            console.log(e)
            res.json({
                success: false,
                message: "Serve can't read file",
                data: undefined
            })
        }
    })
}

const ClassSectionController = {
    create,
    update,
    getAll,
    removeByID,
    importClassSections
}

export default ClassSectionController