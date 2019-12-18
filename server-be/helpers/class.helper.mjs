import Class from '../models/class.pg.mjs'
import Sequelize from 'sequelize'

const create = async (data) => {
    try {
        let createdClass = {}
        createdClass = await Class.create({
            lecture: data.lecture,
            code: data.code,
            classSectionCode: data.classSectionCode,
            teacherCode: data.teacherCode,
            day: data.day,
            startAt: data.startAt,
            hourNumber: data.hourNumber,
            roomCode: data.roomCode,
            requireRoom: data.requireRoom
        })
        return {createdClass, err: null}
    } catch(err) {
        return {createdClass: null, err}
    }
}

const retrieveAll = async () => {
    try {
        const classes = await Class.findAll()
        return {classes, err: null}
    } catch (err) {
        return {err, classes: null}
    }
}

const classRunning = async () => {
    try {
        var days = ['sun','mon','tue','wed','thu','fri','sat'];
        var d = new Date();
        const class1 = await Class.findAll({
            where: {
               day : days[d.getDay()]
            }
        })
        const class2 = await Class.findAll({
            where: {
               day: {
                  [Sequelize.Op.not]: days[d.getDay()]
                }
            }
        })
        const classes = [class1, class2];
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
    classRunning,
    retrieveAll,
    createMulti
}

export default ClassHelper