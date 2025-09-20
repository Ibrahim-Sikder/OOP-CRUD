// src/models/User.ts
/**
 * Domain (OOP) User class
 * - Encapsulation: password is private
 * - Static factory method: create()
 */
export class User {
  public id?: string;
  public name: string;
  public email: string;
  private password: string;
  public role: string;

  constructor(name: string, email: string, password: string, role = "user") {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  // We provide a getter for password to pass to persistence layer when needed.
  // In real world, avoid exposing password; here it's a small pragmatic compromise.
  public getPassword(): string {
    return this.password;
  }

  public static create(name: string, email: string, password: string, role = "user"): User {
    return new User(name, email, password, role);
  }
}
