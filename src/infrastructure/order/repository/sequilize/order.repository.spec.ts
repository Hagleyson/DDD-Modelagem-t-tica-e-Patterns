import { Sequelize } from "sequelize-typescript";

import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

import OrderItem from "../../../../domain/checkout/entity/order_item";

import OrderRepository from "./order.repository";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/Product.repository";
import Product from "../../../../domain/product/entity/product";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find one Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find("123");
    expect(foundOrder).toStrictEqual(order);
  });

  it("should findAll Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const customer2 = new Customer("456", "Customer 1");
    const address2 = new Address("Street 1", 10, "Zipcode 1", "City 1");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product2 = new Product("456", "Product 1", 10);

    await productRepository.create(product2);

    const ordemItem2 = new OrderItem(
      "456",
      product.name,
      product.price,
      product.id,
      2
    );

    const order2 = new Order("456", "456", [ordemItem2]);

    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toStrictEqual([order, order2]);
  });

  it("should update Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);
    await productRepository.create(product);
    await productRepository.create(product2);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const ordemItem2 = new OrderItem(
      "1333",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    order.addItems(ordemItem2);

    await orderRepository.update(order);
    const result = await orderRepository.find(order.id);

    expect(result).toStrictEqual(order);
  });
});
