import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '89b3WsUOvePdH3g8Ang8N4Ixrv0IR7Rm';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private limit: number = 10;
  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo
  public resultados: Gif[] = []; 

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string): void {
    
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
          .set('apikey', this.apiKey)
          .set('q', query)
          .set('limit', this.limit);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }

}
