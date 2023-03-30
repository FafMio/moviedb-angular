import {Category} from "./category.model";

export class Movie {

  private _id: number;

  private _title: string;
  private _synopsis: number;

  private _releasedAt: Date;
  private _imageUrl: string;

  private _originCountry: string;
  private _originCountryShort: string;

  private _tmdbId: string;
  private _isVerified: boolean;

  private _categories: Array<Category>;

  constructor(
    id: number,
    title: string,
    synopsis: number,
    releasedAt: Date,
    imageUrl: string,
    originCountry: string,
    originCountryShort: string,
    tmdbId: string,
    isVerified: boolean,
    categories: Array<Category>
  ) {
    this._id = id;
    this._title = title;
    this._synopsis = synopsis;
    this._releasedAt = releasedAt;
    this._imageUrl = imageUrl;
    this._originCountry = originCountry;
    this._originCountryShort = originCountryShort;
    this._tmdbId = tmdbId;
    this._isVerified = isVerified;
    this._categories = categories;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get synopsis(): number {
    return this._synopsis;
  }

  set synopsis(value: number) {
    this._synopsis = value;
  }

  get releasedAt(): Date {
    return this._releasedAt;
  }

  set releasedAt(value: Date) {
    this._releasedAt = value;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  get originCountry(): string {
    return this._originCountry;
  }

  set originCountry(value: string) {
    this._originCountry = value;
  }

  get originCountryShort(): string {
    return this._originCountryShort;
  }

  set originCountryShort(value: string) {
    this._originCountryShort = value;
  }

  get tmdbId(): string {
    return this._tmdbId;
  }

  set tmdbId(value: string) {
    this._tmdbId = value;
  }

  get isVerified(): boolean {
    return this._isVerified;
  }

  set isVerified(value: boolean) {
    this._isVerified = value;
  }

  get categories(): Array<Category> {
    return this._categories;
  }

  set categories(value: Array<Category>) {
    this._categories = value;
  }
}
