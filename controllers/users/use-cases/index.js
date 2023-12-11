const db = require('../../../models')
const makeGetUsers = require('./getUsers')
const makeActive = require('./active')
let E = null,
	utils = null,
    usecases;
function init() {
    const getUsers = makeGetUsers(db,E,utils)
    const active = makeActive(db,E,utils)
    usecases = Object.freeze({
        getUsers,
        active
    })
}


module.exports = function (U,errors) {
    utils = U;
	E = errors;
    init()
    return usecases
}
