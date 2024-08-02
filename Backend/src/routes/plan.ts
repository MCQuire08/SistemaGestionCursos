import express from 'express';
import * as planService from '../services/planService';
import DatabaseService from '../services/databaseService'; // Asegúrate de importar el tipo correcto para DatabaseService
import { Plan } from '../types';
import {authenticateToken} from '../services/authMiddleware';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', authenticateToken,async (_req,res) => {
    try{
        const plans = await planService.getPlans(dbService);
        res.json(plans);
    }catch (error){
        console.error('Error al recuperar los planes:', error);
    res.status(500).json({ error: 'Error al recuperar planes' });
    }
});

router.get('/getCoursesByUser/:userId',authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const plans = await planService.getUserPlans(dbService, userId);
        res.json(plans);
    } catch (error) {
        console.error('Error al recuperar los planes del usuario:', error);
        res.status(500).json({ error: 'Error al recuperar planes del usuario' });
    }
});

router.put('/updateProgress/:planId', authenticateToken, async (req, res) => {
    try {
        const planId = req.params.planId;
        const { newProgress } = req.body;

        await planService.updateProgress(dbService, parseInt(planId, 10), newProgress);

        res.json({ success: true, message: 'Progreso actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el progreso del plan:', error);
        res.status(500).json({ error: 'Error al actualizar el progreso del plan' });
    }
});

router.post('/',authenticateToken, async (req, res) => {
    try{
        const { idCourse,idUser,progress } = req.body;
        const newPlan: Plan = {
            idPlan:0,
            idCourse,
            idUser,
            progress
        };

        const planId = await planService.createPlan(dbService,newPlan);
        res.json({planId});
    } catch (error) {
        console.error('Error al crear plan:', error);
        res.status(500).json({ error: 'Error al crear plan' });
    }
});

export default router;