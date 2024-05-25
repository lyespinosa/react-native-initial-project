import Appointment from '../entities/appointment';

export default interface AppointmentInterface {
  getAll(): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment>;
  save(appointment: Appointment): Promise<Appointment>;
  update(id: string, appointment: Appointment): Promise<Appointment>;
  delete(id: string): Promise<void>;
}
