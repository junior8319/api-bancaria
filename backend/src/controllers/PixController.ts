import { Request, Response } from "express";
import PixService from "../services/PixService";
import IPix from "../interfaces/PixData";

class PixController {
  public pixService: PixService;
  public serverErrorMessage!: object;

  constructor() {
    this.pixService = new PixService();
  }

  public createPix = async (req: Request, res: Response) => {
    const pixData: IPix = req.body;
    const pix = await this.pixService.createPix(pixData);

    if (pix) {
      res.status(201).json(pix);
    } else {
      res.status(500).json(this.serverErrorMessage);
    }
  }
}

export default new PixController();