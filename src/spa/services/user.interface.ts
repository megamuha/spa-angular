import { Car } from "src/app/services/car-interface";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    cars: Array<Car>;
}