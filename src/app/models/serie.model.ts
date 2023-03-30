export class Serie {

    private _id: number;

    private _name: string;
    private _description: string;
    private _critical: string;
    private _picture: string;

    private _release_date: Date;
    private _seasons: number;

    private _comments: Array<Comment>;
    

	constructor(id: number, name: string, description: string, critical: string, picture: string, release_date: Date, seasons: number, comments: Array<any>) {
		this._id = id;
		this._name = name;
		this._description = description;
		this._critical = critical;
		this._picture = picture;
		this._release_date = release_date;
		this._seasons = seasons;
        this._comments = comments;
	}

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter description
     * @return {string}
     */
	public get description(): string {
		return this._description;
	}

    /**
     * Getter critical
     * @return {string}
     */
	public get critical(): string {
		return this._critical;
	}

    /**
     * Getter picture
     * @return {string}
     */
	public get picture(): string {
		return this._picture;
	}

    /**
     * Getter release_date
     * @return {Date}
     */
	public get release_date(): Date {
		return this._release_date;
	}

    /**
     * Getter seasons
     * @return {number}
     */
	public get seasons(): number {
		return this._seasons;
	}

    /**
     * Getter comments
     * @return {Array<any>}
     */
	public get comments(): Array<any> {
		return this._comments;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter description
     * @param {string} value
     */
	public set description(value: string) {
		this._description = value;
	}

    /**
     * Setter critical
     * @param {string} value
     */
	public set critical(value: string) {
		this._critical = value;
	}

    /**
     * Setter picture
     * @param {string} value
     */
	public set picture(value: string) {
		this._picture = value;
	}

    /**
     * Setter release_date
     * @param {Date} value
     */
	public set release_date(value: Date) {
		this._release_date = value;
	}

    /**
     * Setter seasons
     * @param {number} value
     */
	public set seasons(value: number) {
		this._seasons = value;
	}

    /**
     * Setter comments
     * @param {Array<any>} value
     */
	public set comments(value: Array<any>) {
		this._comments = value;
	}

}