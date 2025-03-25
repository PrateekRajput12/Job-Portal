import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getCompany, getCOmpanyById, registerCompany, updateCompany } from '../controllers/company.Controller.js'

const router = express.Router()


router.route("/register").post(isAuthenticated, registerCompany)
router.route("/get").get(isAuthenticated, getCompany)  // student
router.route("/get/:id").get(isAuthenticated, getCOmpanyById)    // student
router.route("/update/:id").put(isAuthenticated, updateCompany)



export default router