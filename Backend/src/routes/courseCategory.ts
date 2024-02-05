import express from 'express';
import * as courseCategoryService from '../services/courseCategoryService';
import DatabaseService from '../services/databaseService';

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', async (req,res) => {
    try{
        const {idCourse} = req.body;
        const plans = await courseCategoryService.getCategorysByCourseId(dbService,idCourse);
        res.json(plans);
    }catch (error){
        console.error('Error al recuperar las categorias del curso:', error);
    res.status(500).json({ error: 'Error recuperar las categorias del curso' });
    }
});


router.post('/', async (req, res) => {
    try{
        const {idCourse, idCategory} = req.body;

        const result = await courseCategoryService.createCourseCategory(dbService,idCourse,idCategory);
        res.json({result});
    } catch (error) {
        console.error('Error al asignar la categoria al curso:', error);
        res.status(500).json({ error: 'Error al la categoria al curso' });
    }
});

export default router;