import { Request, Response } from "express";
import { CaseModel } from "../../../data/models/case.model";

export class CaseController {
    public getAll = async (req: Request, res: Response) => {
        try {
            const cases = await CaseModel.find();
            return res.json(cases);
        } catch (error) {
            return res.json({
                message: "Error fetching cases"
            });
        }
    };
    
    public createCase = async (req: Request, res: Response) => {
        try {
            const { lat, lng, genre, age } = req.body;
            const newCase = await CaseModel.create({
                lat,
                lng,
                isSent: false,
                genre,
                age,
                creationDate: new Date()
            });
            res.json(newCase);
        } catch (error) {
            res.json({
                message: "Error registering case"
            });
        }
    };
    
    public getCaseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const incident = await CaseModel.findById(id);
            return res.json(incident);
        } catch (error) {
            return res.json({
                message: "Error fetching case"
            });
        }
    };
    
    public getLatestCases = async (req: Request, res: Response) => {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        try {
            const cases = await CaseModel.find({
                creationDate: {
                    $gte: lastWeek
                }
            });
            return res.json(cases);
        } catch (error) {
            return res.json({
                message: "Error fetching cases"
            });
        }
    };
    
    public updateCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { lat, lng, genre, age } = req.body;
            await CaseModel.findByIdAndUpdate(id, {
                lat,
                lng,
                genre,
                age
            });
            const updatedCase = await CaseModel.findById(id);
            return res.json(updatedCase);
        } catch (error) {
            return res.json({
                message: "Error updating case"
            });
        }
    };
    
    public deleteCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await CaseModel.findByIdAndDelete(id);
            return res.json({
                message: "Case deleted"
            });
        } catch (error) {
            return res.json({
                message: "Error deleting case"
            });
        }
    };
}