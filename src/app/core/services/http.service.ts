import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/api-end-points.constant';
import { Observable } from 'rxjs/internal/Observable';
import { IPayLoadResponse } from 'src/app/modules/users/interfaces/payload-response.interface';
import { IPayLoad } from 'src/app/modules/users/interfaces/payload.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _httpClient: HttpClient = inject(HttpClient);

  public getAll(params: any, apiUrl: string): Observable<IPayLoadResponse> {
    const endpointUrl = `${API_URL(apiUrl)}?page=${params?.PageNumber}`;
    return this._httpClient.get<IPayLoadResponse>(endpointUrl);
  }
  public getItemById(id: string, apiUrl: string): Observable<IPayLoad> {
    const endpointUrl = `${API_URL(apiUrl)}/${id}`;
    return this._httpClient.get<IPayLoad>(endpointUrl);
  }
}
