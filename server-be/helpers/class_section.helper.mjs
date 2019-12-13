import ClassSection from '../models/class_section.pg.mjs'

const create = async (data) => {
    try {
        console.log(data)
        let createdClassSection = {}
        createdClassSection = await ClassSection.create({
            code: data.code,
            name: data.name,
            creditNumber: data.creditNumber
        })

        return {createdClassSection, err: undefined}
    } catch(err) {
        return {createdClassSection: undefined, err}
    }
}

const retrieveAll = async () => {
    try {
        const classSections = await ClassSection.findAll()
        return {classSections, err: undefined}
    } catch(err) {
        return {err, classSections: undefined}
    }
}

const update = async (id, data) => {
    try {
        const classSection = await ClassSection.findByPk(id)
        if(classSection === null) {
            return {err: new Error("Not exist class section id")}
        } else {
            let ok = classSection.update(data)
            if(!ok) {
                return {err: new Error("Invalid")}
            }
            return {err: undefined}
        }
    } catch(err) {
        return {err}
    }
}

const remove = async (id) => {
    try {
        const classSection = await ClassSection.findByPk(id)
        if(classSection === null) {
            return {err: new Error("Not exist class section id")}
        } else {
            let ok = classSection.destroy({force: true})
            if(!ok) {
                return {err: new Error("Invalid")}
            }
            return {err: undefined}
        }
    } catch(err) {
        return {err}
    }
}

const createMulti = async (classSections) => {
    let createdClassSections = null
    let err = null 
    try {
        let returnValue = await ClassSection.bulkCreate(classSections, {returning: true})
        createdClassSections = returnValue
    } catch (e) {
        err = e 
    }

    return {err, createdClassSections}
}

const ClassSectionHelper = {
    create,
    update,
    remove,
    retrieveAll,
    createMulti
}

export default ClassSectionHelper