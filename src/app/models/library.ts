export enum ELibraryKeys {
  Category = 'Category',
  CommonName = 'CommonName',
  FullName = 'FullName',
  ShortName = 'ShortName',
  ObjectAddress = 'ObjectAddress',
  ChiefOrg = 'ChiefOrg',
  ChiefName = 'ChiefName',
  ChiefPosition = 'ChiefPosition',
  PublicPhone = 'PublicPhone',
  Fax = 'Fax',
  Email = 'Email',
  WorkingHours = 'WorkingHours',
  ClarificationOfWorkingHours = 'ClarificationOfWorkingHours',
  WebSite = 'WebSite',
  NumOfSeats = 'NumOfSeats',
  NumOfReaders = 'NumOfReaders',
  NumOfVisitors = 'NumOfVisitors',
  global_id = 'global_id',
  geoData = 'geoData'
}
export interface IWrapper<T> {
  global_id: number;
  Number: number;
  Cells: T;
}

export interface ILibrary {
  [ELibraryKeys.Category]: string;
  [ELibraryKeys.CommonName]: string;
  [ELibraryKeys.FullName]: string;
  [ELibraryKeys.ShortName]: string;
  [ELibraryKeys.ObjectAddress]: IObjectAddress[];
  [ELibraryKeys.ChiefOrg]: string;
  [ELibraryKeys.ChiefName]: string;
  [ELibraryKeys.ChiefPosition]: string;
  [ELibraryKeys.PublicPhone]: IContact[];
  [ELibraryKeys.Fax]: IContact[];
  [ELibraryKeys.Email]: IContact[];
  [ELibraryKeys.WorkingHours]: IWorkingHours[];
  [ELibraryKeys.ClarificationOfWorkingHours]: string;
  [ELibraryKeys.WebSite]: string;
  [ELibraryKeys.NumOfSeats]: number;
  [ELibraryKeys.NumOfReaders]: number;
  [ELibraryKeys.NumOfVisitors]: number;
  [ELibraryKeys.global_id]: number;
  [ELibraryKeys.geoData]: IGeoData;
}

export interface IChiefPhone {
  is_deleted: number;
  global_id: number;
  ChiefPhone: string;
}

export interface IObjectAddress {
  is_deleted: number;
  AdmArea: string;
  District: string;
  PostalCode: string;
  Address: string;
  Availability: IAvailability[];
  global_id: number;
}

export interface IAvailability {
  is_deleted: number;
  global_id: number;
  available_k: string;
  available_o: string;
  available_z: string;
  available_s: string;
  available_element: IAvailableElement[];
}

export interface IAvailableElement {
  is_deleted: number;
  global_id: number;
  Group_mgn: string;
  Area_mgn: string;
  Element_mgn: string;
  available_degree: string;
  available_index: string;
}

export interface IContact {
  is_deleted: number;
  Email?: string;
  PublicPhone?: string;
  Fax?: string;
  global_id: number;
}

export interface IWorkingHours {
  is_deleted: number;
  DayWeek: string;
  WorkHours: string;
  global_id: number;
}

export interface IGeoData {
  coordinates: number[][];
  type: string;
}

export const LibraryKeyTranslations = new Map<ELibraryKeys, string>([
  [ELibraryKeys.Category, 'Категория'],
  [ELibraryKeys.CommonName, 'Общее название'],
  [ELibraryKeys.FullName, 'Полное официальное наименование'],
  [ELibraryKeys.ShortName, 'Краткое название'],
  [ELibraryKeys.ObjectAddress, 'Адрес объекта'],
  [ELibraryKeys.ChiefOrg, 'Руководящая организация'],
  [ELibraryKeys.ChiefName, 'ФИО руководителя'],
  [ELibraryKeys.ChiefPosition, 'Должность руководителя'],
  [ELibraryKeys.PublicPhone, 'Контактные телефоны'],
  [ELibraryKeys.Fax, 'Факс'],
  [ELibraryKeys.Email, 'Электронная почта'],
  [ELibraryKeys.WorkingHours, 'Часы работы'],
  [ELibraryKeys.ClarificationOfWorkingHours, 'Уточнение часов работы'],
  [ELibraryKeys.WebSite, 'Веб-сайт'],
  [ELibraryKeys.NumOfSeats, 'Количество мест'],
  [ELibraryKeys.NumOfReaders, 'Количество читателей'],
  [ELibraryKeys.NumOfVisitors, 'Количество посетителей'],
  [ELibraryKeys.global_id, 'Глобальный ID'],
  [ELibraryKeys.geoData, 'Геоданные']
]);
