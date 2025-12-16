import { Request, Response } from "express";

const service = new YellowBooksService();

export async function getYellowBooks(req: Request, res: Response) {
  try {
    const data = await service.findAll();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal error" });
  }
}
