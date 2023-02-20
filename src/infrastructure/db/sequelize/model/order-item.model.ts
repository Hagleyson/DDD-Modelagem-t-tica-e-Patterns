import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import ProductModel from "./product.model";
import OrderModel from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: false, //create and update at
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare product_id: number;

  @BelongsTo(() => ProductModel)
  declare customer: CustomerModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare order_id: number;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
