import express from "express";
import * as linkService from '../services/linkService';
import DatabaseService from "../services/databaseService";
import { Link } from "../types";

const router = express.Router();
const dbService = new DatabaseService();

router.get('/', async (_req,res) => {
    try{
        const links = await linkService.getLinks(dbService);
        res.json(links);
    }catch (error){
        console.error('Error al recuperar los links:', error);
    res.status(500).json({ error: 'Error al recuperar links' });
    }
});

router.post('/', async (req, res) => {
    try{
        const { description } = req.body;
        const newLink: Link = {
            idLink:0,
            description
        };

        const linkId = await linkService.createLink(dbService,newLink);
        res.json({linkId});
    } catch (error) {
        console.error('Error al crear link:', error);
        res.status(500).json({ error: 'Error al crear curso' });
    }
});

export default router;