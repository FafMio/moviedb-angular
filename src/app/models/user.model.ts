export class User {

  public id: number;

  public username: string;
  public password: string;
  public email: string;
  public roles: Array<string>;
  public accessToken: string;
  public tokenType: string;

  private static nextId = 1;

  constructor(id: number, username: string, password: string, email: string, roles: Array<string>, accessToken: string, tokenType: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = User.nextId;
      User.nextId++;
    }

    this.username = username;
    this.password = password;
    this.email = email;
    this.roles = roles;

    this.accessToken = accessToken;
    this.tokenType = tokenType;
  }

}
