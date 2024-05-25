import AppointmentInterface from '../../domain/interfaces/appointment.interface';

export class DeleteAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentInterface) {}

  async execute(id: string) {
    return this.appointmentRepository.delete(id);
  }
}
