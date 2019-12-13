import Class from '../models/class.pg.mjs'

const create = async (data) => {
    try {
        let createdClass = {}
        createdClass = await Class.create({
            code: data.code,
            studentNumber: data.studentNumber,
            semester: data.semester,
            day: data.day,
            startTime: data.startTime,
            hourNumber: data.hourNumber,
            students: data.students,
            lecturer: data.lecturer,
            requireRoom: data.requireRoom,
            roomCode: data.roomCode,
            classSectionCode: data.classSectionCode
        })
        return {createdClass, err: null}
    } catch(err) {
        return {createdClass: null, err}
    }
}

const retriveAll = async () => {
    try {
        const classes = await Class.findll()
        return {classes, err: null}
    } catch (err) {
        return {err, classes: null}
    }
}

const update = async (id, data) => {
    try {
        const classRoom = await Class.findByPk(id)
        if(classRoom === null) {
            return {err: new Error("Not exist class id")}
        } else {
            let ok = classRoom.update(data)
            if(!ok) {
                return {err: new Error("Invalid")}
            }
            return {err: null}
        }
    } catch(err) {
        return {err}
    }
}

const remove = async (id) => {
    try {
        const classRoom = await Class.findByPk(id)
        if(classRoom === null) {
            return {err: new Error("Not exist class id")}
        } else {
            let ok = classRoom.destroy({force: true})
            if(!ok) {
                return {err: new Error("Cannot remove this class")}
            }
            return {err: null}
        }
    } catch (err) {
        return {err}
    }
}

const createMulti = async (classes) => {
    // Implement me
}

const ClassHelper = {
    create,
    update,
    remove,
    retriveAll,
    createMulti
}

export default ClassHelper