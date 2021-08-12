const { Board,Card,Checklist,Checklistdata } = require('../models')


class ControllerChecklist {

    // make new checklist
    static makeNewChecklist (req,res) {
        const obj = {
            name: req.body.name,
            CardId: req.body.CardId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Checklist.create(obj)
        .then( data => {
            res.status(201).json({
                name: data.name,
                CardId: data.CardId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            })
        })
        .catch(error => {
            res.send(error)
        })
    }

    // delete Checklist 
    static deleteChecklistById (req,res) {
        Checklist.destroy({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json({message: 'Checklist successfully deleted'})
            } else {
                res.send(error)
            }
        })
        .catch(error => {
            res.send(error)
        })
    }    

    //get Checklist by id
    static getChecklistById (req,res) {
        Checklist.findOne({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.send('data checklist tidak ada')
            }
        })
        .catch(error => {
            res.send(error)
        })
    }

    //update Checklist 
    static updateChecklistById (req,res) {
        const obj = {
            name: req.body.name
        }
        Checklist.update(obj,{where: {id: req.params.id}})
        .then(data => {
            if (data) {
                return Checklist.findOne({where: {id: req.params.id}})
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

module.exports = ControllerChecklist