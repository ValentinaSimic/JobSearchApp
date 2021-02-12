const express = require('express')
const router = express.Router()
const multer = require('multer')
const JobsController = require('../controllers/JobController')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({storage: storage})

router.post('/', JobsController.addLocation)
router.post('/', JobsController.addFieldOfWork)
router.post('/:idLocation',upload.single('firmImage'),JobsController.addFirm)
router.post('/:idFirm/:idFieldOfWork', JobsController.addJob)
router.get('/', JobsController.getAllFieldsOfWork)
router.get('/:location/:fieldOfWork', JobsController.getAllJobs)
//router.get('/filterJobs/:seniority/:worktime/:date', JobsController.getFilter)
router.get('/:id', JobsController.getJob)


module.exports = router