export interface IRequestParams {
  id: number;
  api_key?: string;
  $skip: number;
  $top: number;
  $inlinecount: string;
  $filter: string;
  $orderby: string;
}
