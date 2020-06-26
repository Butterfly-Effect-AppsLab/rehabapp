export class User {
    private _username: string;
    private _password: string;
    private _email: string;
    private _sex: string;
    private _birthday: string;

    constructor(username: string, email?: string, password?: string, sex?: string, birthday?: string) {
        this._username = username;
        this._email = email;
        this._password = password;
        this._sex = sex;
        this._birthday = birthday;
    }

    public toJSON(): object {
        return {
            'name': this._username,
            'password': this._password,
            'email': this._email,
            'sex': this._sex,
            'birthday': this._birthday
        }
    }

    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get sex(): string {
        return this._sex;
    }

    public set sex(sex: string) {
        this._sex = sex;
    }

    public get birthday(): string {
        return this._birthday;
    }

    public set birthday(birthday: string) {
        this._birthday = birthday;
    }

    public get name() {
        return this._username;
    }
}