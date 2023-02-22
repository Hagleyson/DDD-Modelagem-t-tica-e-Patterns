import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository-interface";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

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
    const trx = await OrderModel.sequelize!.transaction();
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
          transaction: trx,
        }
      );

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: trx,
      });
      for (const item of entity.items) {
        await ProductModel.findAll({ transaction: trx });

        await OrderItemModel.create(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
          },
          { transaction: trx }
        );
      }

      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw new Error("error in update order");
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id: id },
      include: ["items"],
    });

    if (!orderModel?.id) {
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
