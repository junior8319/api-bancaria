import express, { Request, Response } from 'express';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.get('/', (_req, res): void => {
      res.send('Hello World')
    });
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000/clients/*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  public start(PORT: string | number): void {
    try {
      this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
      console.log(`Error: ${error}`);
      console.log('Failed to start the server');
    }
  }         
}

export default App;