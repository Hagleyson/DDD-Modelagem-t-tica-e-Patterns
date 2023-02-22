import Address from "../../../entity/address";
import Customer from "../../../entity/customer";
import EventDispatcher from "../event-dispatcher";
import AddressUpdatedEvent from "./address-updated.event";
import AddressUpdatedEventHandler from "./handler/send-console-log-when-address-updated";

describe("address update", () => {
  it("should register event when address updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new AddressUpdatedEventHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("AddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["AddressUpdatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer("45", "hagleyson");
    customer.changeAddress(new Address("rua 1", 123, "123123", "brejo"));

    const addressUpdatedEvent = new AddressUpdatedEvent(customer);

    eventDispatcher.notify(addressUpdatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
