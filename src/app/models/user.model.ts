export class User {

    private _id: number;

    private _username: string;
    private _password: string;

    private _firstname: string;
    private _lastname: string;

    static nextId = 1;

    constructor(f_username: string, f_password: string, f_firstname: string, f_lastname: string) {
        this._id = User.nextId;

        this._username = f_username;
        this._password = f_password;

        this._firstname = f_firstname;
        this._lastname = f_lastname;

        User.nextId++;
    }

    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter username
     * @return {string}
     */
    public get username(): string {
        return this._username;
    }

    /**
     * Getter password
     * @return {string}
     */
    public get password(): string {
        return this._password;
    }

    /**
     * Getter firstname
     * @return {string}
     */
    public get firstname(): string {
        return this._firstname;
    }

    /**
     * Getter lastname
     * @return {string}
     */
    public get lastname(): string {
        return this._lastname;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter username
     * @param {string} value
     */
    public set username(value: string) {
        this._username = value;
    }

    /**
     * Setter password
     * @param {string} value
     */
    public set password(value: string) {
        this._password = value;
    }

    /**
     * Setter firstname
     * @param {string} value
     */
    public set firstname(value: string) {
        this._firstname = value;
    }

    /**
     * Setter lastname
     * @param {string} value
     */
    public set lastname(value: string) {
        this._lastname = value;
    }

}
