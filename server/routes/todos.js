const express = require('express')
const router = express.Router()
const ControllerTodo = require('../controllers/controllertodo')
const ControllerCheckList = require('../controllers/controllerchecklist')
const ControllerCheckListData = require('../controllers/controllerchecklistData')
const ControllerCard = require('../controllers/controllercard')


router.get("/", ControllerTodo.getAllData)

router.get("/board/:id", ControllerTodo.getBoardById)
router.post("/board", ControllerTodo.makeNewBoard)
router.put("/board/:id", ControllerTodo.updateBoardById)
router.delete("/board/:id", ControllerTodo.deleteBoardById)

router.get("/card/:id", ControllerCard.getCardById)
router.post("/card", ControllerCard.makeNewCard)
router.put("/card/:id", ControllerCard.updateCardById)
router.delete("/card/:id", ControllerCard.deleteCardById)

router.get("/checklist/:id", ControllerCheckList.getChecklistById)
router.post("/checklist", ControllerCheckList.makeNewChecklist)
router.put("/checklist/:id", ControllerCheckList.updateChecklistById)
router.delete("/checklist/:id", ControllerCheckList.deleteChecklistById)

router.get("/checklistdata/:id", ControllerCheckListData.getChecklistDataById)
router.post("/checklistdata", ControllerCheckListData.makeNewChecklistData)
router.put("/checklistdata/:id", ControllerCheckListData.updateChecklistDataById)
router.delete("/checklistdata/:id", ControllerCheckListData.deleteChecklistdata)

module.exports = router