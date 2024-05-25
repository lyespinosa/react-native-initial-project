export default class Appointment {
  id: string;
  name: string;
  reason: string;
  date: string;
  time: string;

  constructor(
    id: string,
    name: string,
    reason: string,
    date: string,
    time: string,
  ) {
    this.id = id;
    this.name = name;
    this.reason = reason;
    this.date = date;
    this.time = time;
  }
}
