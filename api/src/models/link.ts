import { ObjectId } from "mongodb";

export type linkCode = string;

export interface LinkDocument {
	originalUrl: string, 
	code: linkCode, 
	createdAt: Date, 
	clicks: number, 
	_id?: ObjectId
}