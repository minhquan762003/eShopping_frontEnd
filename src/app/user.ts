export class User {
  userId?: number; // dấu ? cho phép trường này là tùy chọn
  username: string;
  password: string;
  email: string;
  token:string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(username: string, password: string, email: string,token: string, userId?: number, createdAt?: Date, updatedAt?: Date) {
    this.username = username;
    this.password = password;
    this.token =token;
    this.email = email;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Getter và Setter cho id
  get getId(): number | undefined {
    return this.userId;
  }

  set setuserId(userId: number | undefined) {
    this.userId = userId;
  }

  // Getter và Setter cho username
  get getUsername(): string {
    return this.username;
  }

  set setUsername(username: string) {
    this.username = username;
  }

  // Getter và Setter cho password
  get getPassword(): string {
    return this.password;
  }

  set setPassword(password: string) {
    this.password = password;
  }

  // Getter và Setter cho email
  get getEmail(): string {
    return this.email;
  }

  set setEmail(email: string) {
    this.email = email;
  }

  // Getter và Setter cho createdAt
  get getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  set setCreatedAt(createdAt: Date | undefined) {
    this.createdAt = createdAt;
  }

  // Getter và Setter cho updatedAt
  get getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  set setUpdatedAt(updatedAt: Date | undefined) {
    this.updatedAt = updatedAt;
  }
}
