export class User {
    private _username: string;
    private _password: string;
    private _email: string;

    constructor(username: string, email: string, password: string){
        this._username = username;
        this._email = email;
        this._password = password;
    }

    public get username(): string{
        return this._username;
    }

    public set username(username: string) {
        this._username = username;
    }
    
    public get password(): string{
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get email() : string {
        return this._email;
    }

    public set email(email : string) {
        this._email = email;
    }
    
}