import AppointmentInterface from '../../domain/interfaces/appointment.interface';

export class GetAllAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentInterface) {}

  async execute() {
    return this.appointmentRepository.getAll();
  }
}
