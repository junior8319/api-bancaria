import PixModel from "../database/models/Pix";
import { IPixData, IPixToSend } from "../interfaces/PixData";

class PixService {
  static pixModel: PixModel;

  constructor() {
    PixService.pixModel = new PixModel();
  }

  public createPix = async (pixData: IPixToSend): Promise<IPixData | null> => {
    try {
      if (!pixData) return null;

      const pix: IPixData | null = await PixModel.create({  ...pixData });

      const returnMessage = `Pix criado com sucesso!`;

      return { ...pix, returnMessage};
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default PixService;