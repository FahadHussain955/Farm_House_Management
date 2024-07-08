export class CreateReservationDto {
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    roomId: number;
  }
  
  export class UpdateReservationDto {
    guestName?: string;
    checkInDate?: string;
    checkOutDate?: string;
    roomId?: number;
  }
  