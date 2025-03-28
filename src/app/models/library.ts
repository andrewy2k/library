interface IAvailabilityElement {
  is_deleted: number;
  global_id: number;
  Group_mgn: string;
  Area_mgn: string;
  Element_mgn: string;
  available_degree: string;
  available_index: string;
}

interface IAvailability {
  is_deleted: number;
  global_id: number;
  available_k: string;
  available_o: string;
  available_z: string;
  available_s: string;
  available_element: IAvailabilityElement[];
}

interface IObjectAddress {
  is_deleted: number;
  AdmArea: string;
  District: string;
  PostalCode: string;
  Address: string;
  Availability: IAvailability[];
  global_id: number;
}

interface IChiefPhone {
  is_deleted: number;
  global_id: number;
  ChiefPhone: string;
}

interface IOrgInfo {
  is_deleted: number;
  ChiefPhone: IChiefPhone[];
  FullName: string;
  INN: string;
  KPP: string;
  OGRN: string;
  LegalAddress: string;
  ChiefName: string;
  ChiefPosition: string;
  global_id: number;
}

interface IContact {
  is_deleted: number;
  global_id: number;
  PublicPhone?: string;
  Fax?: string;
  Email?: string;
}

interface IWorkingHours {
  is_deleted: number;
  DayWeek: string;
  WorkHours: string;
  global_id: number;
}

interface ILibrary {
  is_deleted: number;
  Category: string;
  CommonName: string;
  FullName: string;
  ShortName: string;
  OrgInfo: IOrgInfo[];
  ObjectAddress: IObjectAddress[];
  ChiefOrg: string;
  ChiefName: string;
  ChiefPosition: string;
  PublicPhone: IContact[];
  Fax: IContact[];
  Email: IContact[];
  WorkingHours: IWorkingHours[];
  ClarificationOfWorkingHours: string;
  WebSite: string;
  NumOfSeats: number;
  NumOfReaders: number;
  NumOfVisitors: number;
  global_id: number;
  geoData: { type: string; coordinates: number[][] };
  geodata_center: null;
}
