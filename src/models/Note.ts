// src/models/Note.ts
export class Note {
  public id?: string;
  public title: string;
  public content: string;
  public owner: string; // user id

  constructor(title: string, content: string, owner: string) {
    this.title = title;
    this.content = content;
    this.owner = owner;
  }

  public static create(title: string, content: string, owner: string) {
    return new Note(title, content, owner);
  }
}
