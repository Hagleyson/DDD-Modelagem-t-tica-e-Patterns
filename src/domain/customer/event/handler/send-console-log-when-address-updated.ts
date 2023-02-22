import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import AddressUpdatedEvent from "../address-updated.event";

export default class AddressUpdatedEventHandler
  implements EventHandlerInterface<AddressUpdatedEvent>
{
  handle(event: AddressUpdatedEvent): void {
    const { eventData } = event;
    console.log(
      `Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData._address}`
    );
  }
}
