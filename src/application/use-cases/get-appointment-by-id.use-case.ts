import AppointmentInterface from '../../domain/interfaces/appointment.interface';

export class GetAppointmentByIdUseCase {
  constructor(private appointmentRepository: AppointmentInterface) {}

  async execute(id: string) {
    return this.appointmentRepository.findById(id);
  }
}
