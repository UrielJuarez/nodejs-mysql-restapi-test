import { Router } from "express"; //para crear las rutas y colocarles un nombre
import {getEmployees,getEmployee, createEmployees, updateEmployees, deleteEmployees} from '../controllers/employees.controller.js'

const router = Router() //variable para enrutar

router.get('/employees', getEmployees)
router.get('/employees/:id', getEmployee)


router.post('/employees', createEmployees)

router.patch('/employees/:id', updateEmployees)

router.delete('/employees/:id', deleteEmployees)

export default router //ya termine de escribir todo, exportalo