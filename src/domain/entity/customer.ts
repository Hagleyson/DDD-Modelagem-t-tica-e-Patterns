//Entidade focado em negocio já o ORM usa entidade focada em Persistência(model)

import Address from "./address";

/**
  Complexidade de negocio 
  Domain
    -Entity
      -- customer.ts (regra de negocio)
  
  Complexidade acidental 
    infra - Mundo externo
      - Entity / Model
      --customer.ts (get,set)

 */
export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }

  isActive() {
    return this._active;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  set Address(address: Address) {
    this._address = address;
  }

  deactivate() {
    this._active = false;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  changeAddress(address: Address) {
    this._address = address;
  }
}
