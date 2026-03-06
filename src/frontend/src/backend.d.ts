import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    serviceType: string;
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getInquiriesByServiceType(serviceType: string): Promise<Array<Inquiry>>;
    getInquiry(id: string): Promise<Inquiry | null>;
    getTotalInquiriesCount(): Promise<bigint>;
    submitInquiry(id: string, name: string, email: string, phone: string, message: string, serviceType: string): Promise<void>;
}
