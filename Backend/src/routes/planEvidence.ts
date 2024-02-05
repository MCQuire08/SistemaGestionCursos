import express from 'express';
import * as planEvidenceService from '../services/planEvidenceService';
import DatabaseService from '../services/databaseService';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', async (req,res) => {
    try{
        const {idPlan} = req.body;
        const plans = await planEvidenceService.getEvidenceByPlanId(dbService,idPlan);
        res.json(plans);
    }catch (error){
        console.error('Error al recuperar las evidencias:', error);
    res.status(500).json({ error: 'Error al recuperar las evidencias' });
    }
});


router.post('/', async (req, res) => {
    try{
        const {idPlan,idEvidence} = req.body;

        const result = await planEvidenceService.createPlanEvidence(dbService,idPlan,idEvidence);
        res.json({result});
    } catch (error) {
        console.error('Error al asignar la evidencia:', error);
        res.status(500).json({ error: 'Error al asignar la evidencia' });
    }
});

export default router;