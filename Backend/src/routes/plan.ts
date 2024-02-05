import express from 'express';
import * as planService from '../services/planService';
import DatabaseService from '../services/databaseService'; // Asegúrate de importar el tipo correcto para DatabaseService
import { Plan } from '../types';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', async (_req,res) => {
    try{
        const plans = await planService.getPlans(dbService);
        res.json(plans);
    }catch (error){
        console.error('Error al recuperar los planes:', error);
    res.status(500).json({ error: 'Error al recuperar planes' });
    }
});


router.post('/', async (req, res) => {
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