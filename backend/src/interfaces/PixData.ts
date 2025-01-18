export default interface IPix {
  pix: {
    id: number;
    creditedClientId: number;
    payerClientId: number;
    value: number;
    pixKey: string;
    message?: string;
    status: string;
  }
}