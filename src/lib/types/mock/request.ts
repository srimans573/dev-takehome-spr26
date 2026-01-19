import { RequestStatus } from "../request";

export interface MockItemRequest {
  ID: string;
  requestorName: string;
  itemRequested: string;
  createdDate: Date; //changed from itemCreatedDate to createdDate
  lastEditedDate: Date | null;
  status: RequestStatus;
}

export interface MockCreateItemRequest {
  requestorName: string;
  itemRequested: string;
}

export interface MockEditStatusRequest {
  id: number;
  status: RequestStatus;
}
