const { Board,Card,Checklist,Checklistdata } = require('../models')


class ControllerCard {

    // make new card
    static makeNewCard (req,res) {
        const obj = {
            name: req.body.name,
            description: req.body.description,
            BoardId: req.body.BoardId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Card.create(obj)
        .then( data => {
            res.status(201).json({
                name: data.name,
                description: data.description,
                BoardId: data.BoardId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            })
        })
        .catch(error => {
            res.send(error)
        })
    }
    
    // delete Card 
    static deleteCardById (req,res) {
        Card.destroy({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json({message: 'Card successfully deleted'})
            } else {
                res.send(error)
            }
        })
        .catch(error => {
            res.send(error)
        })
    }

    //get Card by id
    static getCardById (req,res) {
        Card.findOne({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.send('data card tidak ada')
            }
        })
        .catch(error => {
            res.send(error)
        })
    }

    //update Card 
    static updateCardById (req,res) {
        const obj = {
            name: req.body.name,
            description: req.body.description,
            BoardId: req.body.BoardId,
        }
        Card.update(obj,{where: {id: req.params.id}})
        .then(data => {
            if (data) {
                return Card.findOne({where: {id: req.params.id}})
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

module.exports = ControllerCard