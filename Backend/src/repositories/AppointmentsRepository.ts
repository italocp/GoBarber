import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByProvider(
    provider_id: string,
  ): Promise<Appointment | null> {
    const findProvider = await this.findOne({
      where: { provider_id },
    });
    return findProvider || null;
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findDate = await this.findOne({
      where: { date },
    });

    return findDate || null;
  }
}

export default AppointmentsRepository;
