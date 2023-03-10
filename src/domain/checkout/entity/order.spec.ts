import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty ", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty ", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty ", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Item qtd must be greater than 0");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "item 2", 200, "p2", 2);
    const order = new Order("1", "c1", [item, item2]);

    const total = order.total();
    expect(total).toBe(600);
  });

  it("should throw error if the item qte is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("1", "item 1", 100, "p1", 0);
      const order = new Order("1", "c1", [item]);
    }).toThrowError("Quantity must be greater than 0");
  });
});
