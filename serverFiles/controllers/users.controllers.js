const { selectAllUsers, selectUserByUsername} = require('../models/users.models')


function getAllUsers(req,res,next){
    selectAllUsers().then((users)=>{

        res.status(200).send({ users })
    }).catch(next)

}

function getUserByUsername(req,res,next){
    const {username} = req.params
    selectUserByUsername(username).then((user)=>{
        res.status(200).send({user})
    }).catch(next)
}


module.exports = {getAllUsers, getUserByUsername};