import EventDispatcher from "../event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviarConsoleLog1Handler from "./handler/enviar-console-log1.handler";
import EnviarConsoleLog2Handler from "./handler/enviar-console-log2.handler";

describe("customer events tests", () => {
  it("should register event of customer", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviarConsoleLog1Handler();
    const eventHandler2 = new EnviarConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customer = new CustomerCreatedEvent({ id: "10", name: "hagleyson" });

    eventDispatcher.notify(customer);
    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});
