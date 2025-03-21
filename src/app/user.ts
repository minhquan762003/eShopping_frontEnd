export class User {
  userId?: number; // Dấu ? cho phép trường này là tùy chọn
  username: string;
  password?: string; // Thêm password (nếu cần)
  email: string;
  name: string;
  gender: number;
  number: string;
  birthDay: Date;
  createdAt?: Date;
  updatedAt?: Date;
  token?: string; // Thêm token (nếu cần)

  constructor(
    username: string,
    password: string,
    email: string,
    gender: number,
    token: string,
    name: string,
    number: string,
    birthDay: Date,
    userId?: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.token = token;
    this.name = name;
    this.number = number;
    this.birthDay = birthDay;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Getter và Setter cho userId
  get getUserId(): number | undefined {
    return this.userId;
  }

  set setUserId(userId: number | undefined) {
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
  get getPassword(): string | undefined {
    return this.password;
  }

  set setPassword(password: string | undefined) {
    this.password = password;
  }

  // Getter và Setter cho email
  get getEmail(): string {
    return this.email;
  }

  set setEmail(email: string) {
    this.email = email;
  }

  // Getter và Setter cho gender
  get getGender(): number {
    return this.gender;
  }

  set setGender(gender: number) {
    this.gender = gender;
  }

  // Getter và Setter cho token
  get getToken(): string | undefined {
    return this.token;
  }

  set setToken(token: string | undefined) {
    this.token = token;
  }

  // Getter và Setter cho name
  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  // Getter và Setter cho number (số điện thoại)
  get getNumber(): string {
    return this.number;
  }

  set setNumber(number: string) {
    this.number = number;
  }

  // Getter và Setter cho birthDay
  get getBirthDay(): Date {
    return this.birthDay;
  }

  set setBirthDay(birthDay: Date) {
    this.birthDay = birthDay;
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
