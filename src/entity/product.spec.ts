describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {}).toThrowError("Id is required");
  });
});
