export default interface IClient {
  id: number
  name: string;
  cpf: string;
  password: string;

  token?: {
    data?: string;
  };
}