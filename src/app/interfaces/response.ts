import { StatusResponse } from './status-response';
import { OutputResponse } from './output-response';

export interface Response<T> {
  status: StatusResponse;
  output: T;
}
