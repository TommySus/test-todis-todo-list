const { Board,Card,Checklist,Checklistdata } = require('../models')


class ControllerChecklistData {

    // make new checklist data
    static makeNewChecklistData (req,res) {
        const obj = {
            name: req.body.name,
            status: 0,
            ChecklistId: req.body.ChecklistId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Checklistdata.create(obj)
        .then( data => {
            res.status(201).json({
                name: data.name,
                status: data.status,
                ChecklistId: data.ChecklistId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            })
        })
        .catch(error => {
            res.send(error)
        })
    }

    // delete Checklistdata 
    static deleteChecklistdata (req,res) {
        Checklistdata.destroy({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json({message: 'Checklistdata successfully deleted'})
            } else {
                res.send(error)
            }
        })
        .catch(error => {
            res.send(error)
        })
    }

    //get ChecklistData by id
    static getChecklistDataById (req,res) {
        Checklistdata.findOne({where: {id: req.params.id}})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.send('data Checklist Data tidak ada')
            }
        })
        .catch(error => {
            res.send(error)
        })
    }

    //update ChecklistData 
    static updateChecklistDataById (req,res) {
        const obj = {
            name: req.body.name,
            status: req.body.status
        }
        Checklistdata.update(obj,{where: {id: req.params.id}})
        .then(data => {
            if (data) {
                return Checklistdata.findOne({where: {id: req.params.id}})
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

module.exports = ControllerChecklistData