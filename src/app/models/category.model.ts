export class Category {

  private _id: number;

  private _title: string;
  private _bgHexColor: string;
  private _textHexColor: string;

  constructor(id: number, title: string, bgHexColor: string, textHexColor: string) {
    this._id = id;
    this._title = title;
    this._bgHexColor = bgHexColor;
    this._textHexColor = textHexColor;
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

  get bgHexColor(): string {
    return this._bgHexColor;
  }

  set bgHexColor(value: string) {
    this._bgHexColor = value;
  }

  get textHexColor(): string {
    return this._textHexColor;
  }

  set textHexColor(value: string) {
    this._textHexColor = value;
  }
}
