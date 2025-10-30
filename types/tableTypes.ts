
export interface TableInput {
  number: number | string; // can be string if coming from form input
  seats: number | string;
}


export interface TableData{
     number: number;
    id: string;
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
    seats: number;
}