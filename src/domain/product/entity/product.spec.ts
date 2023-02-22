import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("1", "hag", -100);
    }).toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("1", "hag", 100);
    product.changeName("2");
    expect(product.name).toBe("2");
  });

  it("should change name", () => {
    const product = new Product("1", "hag", 100);
    product.changePrice(5200);
    expect(product.price).toBe(5200);
  });
});