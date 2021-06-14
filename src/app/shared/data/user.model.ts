export class User {
  id: number;
  userName: string;
  password: string;
  active: boolean;
  roles: string;

  constructor(id:number, userName:string, password:string, active:boolean, roles: string ){
    this.id =id;
    this.userName = userName;
    this.password = password;
    this.active = active;
    this.roles = roles;
  }

}
