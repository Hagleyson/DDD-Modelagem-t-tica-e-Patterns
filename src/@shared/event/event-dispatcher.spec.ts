import SendEmailWhenPRoductIsCreatedHandler from "../../domain/product/event/handler/send-email-when-product-is-created.handle";
import ProductCreatedEvent from "../../domain/product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenPRoductIsCreatedHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenPRoductIsCreatedHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);

    eventDispatcher.unregister("ProductCreateEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenPRoductIsCreatedHandler();

    eventDispatcher.register("ProductCreateEvent", eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreateEvent"]
    ).toBeUndefined();
  });
  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenPRoductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const ProductCreateEvent = new ProductCreatedEvent({
      name: "p1",
      description: "p1 desc",
      price: 10,
    });

    eventDispatcher.notify(ProductCreateEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
