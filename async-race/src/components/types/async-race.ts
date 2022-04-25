export enum Status {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  TOOMANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Method {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export enum Headers {
  TOTAL_COUNT = 'X-Total-Count',
  CONTENT_TYPE = 'Content-Type',
}

export enum ContentType {
  JSON = 'application/json',
}

export enum Sort {
  ID = 'id',
  TIME = 'time',
  WINS = 'wins',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EngineStatus {
  STOP = 'stopped',
  START = 'started',
  DRIVE = 'drive',
}

export type CarModels = string[];

export interface Car {
  name: string;
  color: string;
  id?: number;
}

export type Garage = Car[];

export interface GarageData {
  garage: Garage;
  total: number;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface Drive {
  success: boolean;
}

export interface Winner {
  id?: number;
  wins?: number;
  time: number;
  car?: Car;
}

export type Winners = Winner[];

export interface WinnersData {
  winners: Winners;
  total: number;
}

export interface Racer {
  id: number;
  time: number;
}
