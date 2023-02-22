import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("A", "Produto A", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Produto A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });
  it("should create a product type b", () => {
    const product = ProductFactory.create("B", "Produto B", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Produto B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when product type is not supported", () => {
    expect(() => {
      ProductFactory.create("C", "Produto C", 1);
    }).toThrowError("Product type not supported");
  });
});
