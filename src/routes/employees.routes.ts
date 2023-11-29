import { Router } from 'express';
import { getEmployeeById, createEmployee, getEmployees, updateEmployee, deleteEmployee } from '../controllers/Employees.controller';
import validateToken from '../services/validateToken';

const router = Router();

router.get('/employees', validateToken, getEmployees);

router.get('/employees/:id', validateToken, getEmployeeById);

router.post('/employees', validateToken, createEmployee);

router.patch('/employees/:id', validateToken, updateEmployee)

router.delete('/employees/:id', validateToken, deleteEmployee)

export default router;