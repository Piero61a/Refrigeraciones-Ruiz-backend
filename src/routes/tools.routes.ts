import { Router } from 'express';
import validateToken from '../services/validateToken';
import { createTool, deleteTool, getToolById, getTools, updateTool } from '../controllers/tools.controller';

const router = Router();

router.get('/tools', validateToken, getTools);

router.get('/tools/:id', validateToken, getToolById);

router.post('/tools', validateToken, createTool);

router.patch('/tools/:id', validateToken, updateTool)

router.delete('/tools/:id', validateToken, deleteTool)

export default router;