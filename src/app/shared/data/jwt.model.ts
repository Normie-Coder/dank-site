export class JwtModel{
  exp:number;
  iss: string;
  role: string;
  sub: string;

  constructor(exp:number, iss:string, role:string, sub:string){
    this.exp = exp;
    this.iss = iss;
    this.role = role;
    this.sub = sub;
  }
}
