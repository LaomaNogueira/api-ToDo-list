// import { UserPaginated, UserRepository } from '../../../infra/typeorm/domain/repositories';
// import { EnumServiceError } from './';
// import { UserFilter } from './';

class UserService {

  // private static validateDateFilter(startDate: string, endDate: string): void | Error {
  //   if (startDate || endDate) {
  //     if (!startDate || !endDate) {
  //       throw new Error(EnumServiceError.INVALID_PERIOD);
  //     }

  //     const parsedStartDate = new Date(startDate);
  //     const parsedEndDate = new Date(endDate);

  //     const timePeriod = (parsedEndDate.getTime() - parsedStartDate.getTime()) / (1000 * 3600 * 24);

  //     if (timePeriod > 90 || parsedEndDate < parsedStartDate || parsedStartDate > new Date()) {
  //       throw new Error(EnumServiceError.INVALID_PERIOD);
  //     }
  //   }
  // }

  // static async findAllWithFilters(
  //   hospitalId: string, filter: UserFilter
  // ): Promise<UserPaginated> {

  //   this.validateDateFilter(filter.startNotificationDate, filter.endNotificationDate);
  //   const user = await UserRepository
  //     .findAllWithFilters(hospitalId, filter)
  //     .catch(() => {
  //       throw new Error(EnumServiceError.NOT_FOUND);
  //     });

  //   return user;
  // }

  // static async buildReport(hospitalId: string, filter: UserFilter) {
  //   let startDate = filter.startNotificationDate;
  //   let endDate = filter.endNotificationDate;

  //   this.validateDateFilter(startDate, endDate);

  //   if (!startDate && !endDate) { 
  //     const oneDayMs = 1000 * 3600 * 24;
  //     const ninetyDaysMs = oneDayMs * 90;
  //     const newStartDateMs = (new Date().getTime() - ninetyDaysMs);
  //     endDate = new Date().toISOString().split('T')[0]; 
  //     startDate = new Date(newStartDateMs).toISOString().split('T')[0];
  //   }

  //   const user = await UserRepository
  //     .findAllWithFilters(hospitalId, {
  //       ...filter,
  //       endNotificationDate: endDate,
  //       startNotificationDate: startDate
  //     }, true)
  //     .catch(() => {
  //       throw new Error(EnumServiceError.NOT_FOUND);
  //     });

  //   return user;
  // }
}

export { UserService };
