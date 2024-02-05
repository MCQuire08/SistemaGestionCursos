import express from 'express';
import * as courseService from '../services/courseService';
import DatabaseService from '../services/databaseService'; // Asegúrate de importar el tipo correcto para DatabaseService
import { Course } from '../types';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', async (_req,res) => {
    try{
        const courses = await courseService.getCourses(dbService);
        res.json(courses);
    }catch (error){
        console.error('Error al recuperar los cursos:', error);
    res.status(500).json({ error: 'Error al recuperar cursos' });
    }
});

router.post('/', async (req, res) => {
    try{
        const { name, description, duration} = req.body;
        const newCourse: Course = {
            idCourse:0,
            name,
            description,
            duration
        };

        const courseId = await courseService.createCourse(dbService,newCourse);
        res.json({courseId});
    } catch (error) {
        console.error('Error al crear curso:', error);
        res.status(500).json({ error: 'Error al crear curso' });
    }
});

export default router;