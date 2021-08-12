const { Board,Card,Checklist,Checklistdata } = require('../models')


class ControllerTodo {

    // make new board
    static makeNewBoard (req,res) {
        const obj = {
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Board.create(obj)
        .then( data => {
            res.status(201).json({
                name: data.name,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            })
        })
        .catch(error => {
            res.send(error)
        })
    }

    // delete board 
    static deleteBoardById (req,res) {
        Board.destroy({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json({message: 'Board successfully deleted'})
            } else {
                res.send(error)
            }
        })
        .catch(error => {
            res.send(error)
        })
    }

    // get all data
    static getAllData (req,res) {
        Board.findAll({
            include: [
              {
                model: Card, 
                include: [
                    { 
                        model: Checklist,
                        include: [
                            { 
                                model: Checklistdata 
                            }
                        ] 
                    }
                ]  
              }
            ]
          })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.send(error)
        })
    }

    //get board by id
    static getBoardById (req,res) {
        Board.findOne({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.send('data board tidak ada')
            }
        })
        .catch(error => {
            res.send(error)
        })
    }

    //update board 
    static updateBoardById (req,res) {
        const obj = {
            name: req.body.name
        }
        Board.update(obj,{where: {id: req.params.id}})
        .then(data => {
            if (data) {
                return Board.findOne({where: {id: req.params.id}})
                .then(data2 => {
                   res.status(200).json(data2)
                })
                .catch(error => {
                    res.send(error)
                })   
            } else {
                res.send(error)
            }
        })
        .catch(error => {
            res.send(error)
        })
    }
}

module.exports = ControllerTodo