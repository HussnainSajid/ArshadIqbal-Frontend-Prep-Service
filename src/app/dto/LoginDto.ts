export class LoginDto {
    Email: string;
    Password: string;
    UniqueIdentifier: string;
  
    constructor(email: string, password: string, uniqueIdentifier: string) {
      this.Email = email;
      this.Password = password;
      this.UniqueIdentifier = uniqueIdentifier;
    }
  }