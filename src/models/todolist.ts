export interface IGetTodoResponse {
  Id: number;
  Title: string;
  Description: string;
  Status: string;
  CreateOn: string;
  CreatedBy: string;
  ModifiedOn: string;
  ModifiedBy: boolean;
}

export interface IAddLsitRequest {
  title: string,
  status: string,
  description: string
}

export interface IUpdateRequest {
  id: number,
  title: string,
  status: string,
  description: string
}
