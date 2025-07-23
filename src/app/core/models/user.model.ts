export class User {
  name: string;
  email: string;
  role: Array<string>;

  constructor(user) {
    this.name = user.name || undefined; 
    this.email = user.email || undefined;
    this.role = user.role || undefined;                    
  }
}