import express from 'express';
import * as courseLinkService from '../services/courseLinkService';
import DatabaseService from '../services/databaseService';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', async (req,res) => {
    try{
        const {idCourse} = req.body;
        const plans = await courseLinkService.getLinksByCourseId(dbService,idCourse);
        res.json(plans);
    }catch (error){
        console.error('Error al recuperar los links del curso:', error);
    res.status(500).json({ error: 'Error recuperar los links del curso' });
    }
});


router.post('/', async (req, res) => {
    try{
        const {idCourse, idLink} = req.body;

        const result = await courseLinkService.createCourseLink(dbService,idCourse,idLink);
        res.json({result});
    } catch (error) {
        console.error('Error al asignar los links al curso:', error);
        res.status(500).json({ error: 'Error al asignar los links del curso' });
    }
});

export default router;