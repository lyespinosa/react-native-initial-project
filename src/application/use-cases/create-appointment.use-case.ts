import Appointment from '../../domain/entities/appointment';
import AppointmentInterface from '../../domain/interfaces/appointment.interface';

export class CreateAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentInterface) {}

  async execute(appointment: Appointment) {
    return this.appointmentRepository.save(appointment);
  }
}
