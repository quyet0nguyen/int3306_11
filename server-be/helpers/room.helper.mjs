import Room from '../models/room.pg.mjs'

const create = async (data) => {
    try {
        console.log(data)
        let createdRoom = {}
        createdRoom = await Room.create({
            code: data.code,
            type: data.type,
            position: data.position,
            capacity: data.capacity
        })

        return {createdRoom, err: undefined}
    } catch(err) {
        return {createdRoom: undefined, err}
    }
}

const retrieveAll = async () => {
    try {
        const rooms =await Room.findAll()
        return {rooms: rooms, err: undefined}
    } catch(err) {
        return {err, rooms: undefined}
    }
}

const update = async (id, data) => {
    try {
        const room = await Room.findByPk(id)
        if(room === null) {
            return {err: new Error("Not exist room id")}
        } else {
            let ok = room.update(data)
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
        const room = await Room.findByPk(id)
        if(room === null) {
            return {err: new Error("Not exist room id")}
        } else {
            let ok = room.destroy({force: true})
            if(!ok) {
                return {err: new Error("Invalid")}
            }
            return {err: undefined}
        }
    } catch(err) {
        return {err}
    }
}

const createMulti = async (rooms) => {
    let createdRooms = null
    let err = null

    try {
        let returnValue = await Room.bulkCreate(rooms, {returning: true})
        createdRooms = returnValue
    } catch(error) {
        err = error
    }

    return {err, createdRooms}
}

const RoomHelper = {
    create,
    update,
    remove,
    retrieveAll,
    createMulti
}

export default RoomHelper