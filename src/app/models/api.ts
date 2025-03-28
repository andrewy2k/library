interface IRequestParams {
  id: number;
  offset: number;
  limit: number;
  criteria: string;
  fetchGeodata: boolean;
  epoch: string;
  timestamp: number;
  paging: boolean;
}

interface IResponse<T> {
  status: number;
  found: number;
  message: string;
  response: T[];
  validDate: null;
  filters: object;
}
