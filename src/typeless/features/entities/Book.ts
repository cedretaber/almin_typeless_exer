export default class Book {
  readonly id: number;
  readonly title: string;
  readonly author: string;

  constructor(id: number, title: string, author: string) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
