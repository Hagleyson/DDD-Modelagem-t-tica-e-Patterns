import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty ", () => {
    expect(() => {
      let customer = new Customer("", "eu");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty ", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    let customer = new Customer("1", "eu");
    customer.changeName("Hagleyson");
    expect(customer.name).toEqual("Hagleyson");
  });

  it("should change name is empty", () => {
    let customer = new Customer("1", "eu");

    expect(() => {
      customer.changeName("");
    }).toThrowError("Name is required");
  });

  it("should activate customer", () => {
    let customer = new Customer("1", "eu 1");
    const address = new Address("street 1", 123, "63260000", "Brejo santo");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    let customer = new Customer("1", "eu 1");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined", () => {
    let customer = new Customer("1", "eu 1");

    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    let customer = new Customer("1", "eu 1");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
