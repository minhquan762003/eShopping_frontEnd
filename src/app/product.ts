export class Product {
    productId?: number; // optional
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt?: Date; // optional
    updatedAt?: Date; // optional
imageUrl: any;
  
    constructor(
      name: string,
      description: string,
      price: number,
      stock: number,
      productId?: number,
      createdAt?: Date,
      updatedAt?: Date
    ) {
      this.productId = productId;
      this.name = name;
      this.description = description;
      this.price = price;
      this.stock = stock;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    // Getter và Setter cho productId
    get getProductId(): number | undefined {
      return this.productId;
    }
  
    set setProductId(productId: number | undefined) {
      this.productId = productId;
    }
  
    // Getter và Setter cho name
    get getName(): string {
      return this.name;
    }
  
    set setName(name: string) {
      this.name = name;
    }
  
    // Getter và Setter cho description
    get getDescription(): string {
      return this.description;
    }
  
    set setDescription(description: string) {
      this.description = description;
    }
  
    // Getter và Setter cho price
    get getPrice(): number {
      return this.price;
    }
  
    set setPrice(price: number) {
      this.price = price;
    }
  
    // Getter và Setter cho stock
    get getStock(): number {
      return this.stock;
    }
  
    set setStock(stock: number) {
      this.stock = stock;
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
  