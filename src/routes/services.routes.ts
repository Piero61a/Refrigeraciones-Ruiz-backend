import { Router } from 'express';
import validateToken from '../services/validateToken';
import { createService, deleteTool, getService, getServiceById, updateService } from '../controllers/services.controller';

const router = Router();

router.get('/services', validateToken, getService);

router.get('/services/:id', validateToken, getServiceById);

router.post('/services', validateToken, createService);

router.patch('/services/:id', validateToken, updateService)

router.delete('/services/:id', validateToken, deleteTool)

export default router;