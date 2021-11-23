const fs = require('fs');
const { join } = require('path');

const pathJSON = join(__dirname, 'users.json')
const saveFile = (users) => fs.writeFileSync(pathJSON, JSON.stringify(users, null, '\t'))

const getUsers = () => {
    if (fs.existsSync(pathJSON)) {
        let users = JSON.parse(fs.readFileSync(pathJSON))
        return users
    } else {
        return []
    }
}

const addUser = (user) => {
    let users = getUsers()
    users.push(user)

    saveFile(users)
    return true
}

const updateUser = (index, newValue) => {
    let users = getUsers()

    Object.keys(newValue).forEach(key => {
        users[index][key] = newValue[key]
    })

    saveFile(users)
    return true
}

const deleteUser = (index) => {
    let users = getUsers()
    users.splice(index, 1)

    saveFile(users)
    return true
}


const userRoutes = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {    
            const users = getUsers()

            res.send(users)
        })
        .post((req, res) => {
            const bodyReq = req.body
            addUser(bodyReq)

            res.send(bodyReq)
        })
        .put((req, res) => {
            const bodyReq = req.body
            const userID = req.params.id
            const users = getUsers()

            if (!userID) {
                return res.send({message: 'Insira um ID'})
            } else if (!users[userID]){
                return res.send({message: 'Usuário não encontrado'})
            }

            updateUser(userID, bodyReq)
            res.send({message: 'Usuário atualiado'})
        })
        .delete((req, res) => {
            const userID = req.params.id
            const users = getUsers()

            if (!userID) {
                return res.send({message: 'Insira um ID'})
            } else if (!users[userID]){
                return res.send({message: 'Usuário não encontrado'})
            }

            deleteUser(userID)
            res.send({message: 'Usuário excluído com sucesso'})
        })
}

module.exports = userRoutes