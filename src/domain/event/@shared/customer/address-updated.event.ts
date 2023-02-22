import EventInterface from "../event.interface";

export default class AddressUpdatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(evenData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = evenData;
  }
}
