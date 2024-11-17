export class Order {
    orderId?: number;
    userID?: number;
    status: string;
    total_amount: number;
    createdAt?: Date; // optional
    updatedAt?: Date; // optional

    constructor(
        orderId?: number,
        userID?: number,
        status: string = "Pending",
        total_amount: number = 1,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.orderId = orderId;
        this.userID = userID;
        this.status = status;
        this.total_amount = total_amount;
        this.createdAt = createdAt ? createdAt : new Date();
        this.updatedAt = updatedAt ? updatedAt : new Date();
    }

    // Phương thức để cập nhật trạng thái đơn hàng
    updateStatus(newStatus: string) {
        this.status = newStatus;
        this.updatedAt = new Date();
    }

    // Phương thức để cập nhật tổng số lượng đơn hàng
    updateTotalAmount(newTotal: number) {
        this.total_amount = newTotal;
        this.updatedAt = new Date();
    }

    // Phương thức để hiển thị thông tin đơn hàng
    displayOrderDetails() {
        console.log(`Order ID: ${this.orderId}`);
        console.log(`User ID: ${this.userID}`);
        console.log(`Status: ${this.status}`);
        console.log(`Total Amount: ${this.total_amount}`);
        console.log(`Created At: ${this.createdAt}`);
        console.log(`Updated At: ${this.updatedAt}`);
    }

    // Getter và Setter cho orderId
    getOrderId(): number | undefined {
        return this.orderId;
    }

    setOrderId(orderId: number): void {
        this.orderId = orderId;
    }

    // Getter và Setter cho userID
    getUserId(): number | undefined {
        return this.userID;
    }

    setUserId(userID: number): void {
        this.userID = userID;
    }

    // Getter và Setter cho status
    getStatus(): string {
        return this.status;
    }

    setStatus(status: string): void {
        this.status = status;
        this.updatedAt = new Date();
    }

    // Getter và Setter cho total_amount
    getTotalAmount(): number {
        return this.total_amount;
    }

    setTotalAmount(total_amount: number): void {
        this.total_amount = total_amount;
        this.updatedAt = new Date();
    }

    // Getter và Setter cho createdAt
    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    // Getter và Setter cho updatedAt
    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }

    setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }
}
