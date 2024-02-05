import express from 'express';
import * as evidenceService from '../services/evidenceService';
import DatabaseService from '../services/databaseService'; // Asegúrate de importar el tipo correcto para DatabaseService
import { Evidence } from '../types';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', async (_req,res) => {
    try{
        const courses = await evidenceService.getEvidences(dbService);
        res.json(courses);
    }catch (error){
        console.error('Error al recuperar las evidencias:', error);
    res.status(500).json({ error: 'Error al recuperar evidencias' });
    }
});

router.post('/', async (req, res) => {
    try{
        const { link } = req.body;
        const newEvidence: Evidence = {
            idEvidence:0,
            link
        };

        const courseId = await evidenceService.createEvidence(dbService,newEvidence);
        res.json({courseId});
    } catch (error) {
        console.error('Error al crear la evidencia:', error);
        res.status(500).json({ error: 'Error al crear evidencia' });
    }
});

export default router;