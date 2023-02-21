import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository-interface";
import { ProductModel } from "../db/sequelize/model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize!.transaction();
    try {
      await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: {
            id: entity.id,
          },
        }
      );

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
      });
      for (const item of entity.items) {
        console.log(item);
        const x = await ProductModel.findAll();
        console.log("x ", x);
        await OrderItemModel.create({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        });
      }

      transaction.commit();
    } catch (error) {
      console.log(error);
      transaction.rollback();
      throw new Error("error in update order");
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });
    if (!orderModel) {
      throw new Error("There is not order for this id");
    }
    const orderItem = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );
    return new Order(orderModel.id, orderModel.customer_id, orderItem);
  }

  async findAll(): Promise<Order[]> {
    const orderModel = await OrderModel.findAll({ include: ["items"] });

    return orderModel.map((currentOrder) => {
      const orderItem = currentOrder.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );
      return new Order(currentOrder.id, currentOrder.customer_id, orderItem);
    });
  }
}
