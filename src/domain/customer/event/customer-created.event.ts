import EventInterface from "../../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(evenData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = evenData;
  }
}
