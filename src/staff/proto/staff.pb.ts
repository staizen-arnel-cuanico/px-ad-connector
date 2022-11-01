/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'staff';

/** The message to represent a Staff */
export interface Staff {
  id: number;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  idpId: string;
}

/** The request message for creating a staff */
export interface CreateStaffRequest {
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  idpId: string;
}

/** The response message for creating a staff */
export interface CreateStaffResponse {
  staff: Staff | undefined;
}

/** The request messaage to creating multiple staffs */
export interface CreateManyStaffsRequest {
  staffs: CreateStaffRequest[];
}

/** The response message to creating multiple staffs */
export interface CreateManyStaffsResponse {
  message: string;
}

/** The request message to get logged in user's profile */
export interface GetMyProfileRequest {
  idpId: string;
}

/** The request message for getting a staff */
export interface GetStaffRequest {
  staffId: number;
}

/** The request message for listing staffs */
export interface ListStaffsRequest {
  currentPage: number;
  pageSize: number;
  orderBy: string;
  filter: string;
}

/** The message to represent page information when returing a list */
export interface PageInfo {
  total: number;
  currentPage: number;
  totalFiltered: number;
}

/** The response message for listing staffs */
export interface ListStaffsResponse {
  staffs: Staff[];
  pageInfo: PageInfo | undefined;
}

export const STAFF_PACKAGE_NAME = 'staff';

export interface StaffServiceClient {
  /** Create a staff */

  createStaff(request: CreateStaffRequest): Observable<CreateStaffResponse>;

  /** Upsert many staffs */

  createManyStaffs(
    request: CreateManyStaffsRequest,
  ): Observable<CreateManyStaffsResponse>;

  /** Get profile of logged in user */

  getMyProfile(request: GetMyProfileRequest): Observable<Staff>;

  /** Get a single staff */

  getStaff(request: GetStaffRequest): Observable<Staff>;

  /** List staffs */

  listStaffs(request: ListStaffsRequest): Observable<ListStaffsResponse>;
}

export interface StaffServiceController {
  /** Create a staff */

  createStaff(
    request: CreateStaffRequest,
  ):
    | Promise<CreateStaffResponse>
    | Observable<CreateStaffResponse>
    | CreateStaffResponse;

  /** Upsert many staffs */

  createManyStaffs(
    request: CreateManyStaffsRequest,
  ):
    | Promise<CreateManyStaffsResponse>
    | Observable<CreateManyStaffsResponse>
    | CreateManyStaffsResponse;

  /** Get profile of logged in user */

  getMyProfile(
    request: GetMyProfileRequest,
  ): Promise<Staff> | Observable<Staff> | Staff;

  /** Get a single staff */

  getStaff(
    request: GetStaffRequest,
  ): Promise<Staff> | Observable<Staff> | Staff;

  /** List staffs */

  listStaffs(
    request: ListStaffsRequest,
  ):
    | Promise<ListStaffsResponse>
    | Observable<ListStaffsResponse>
    | ListStaffsResponse;
}

export function StaffServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createStaff',
      'createManyStaffs',
      'getMyProfile',
      'getStaff',
      'listStaffs',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('StaffService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('StaffService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const STAFF_SERVICE_NAME = 'StaffService';
