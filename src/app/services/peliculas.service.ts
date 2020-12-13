import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movies-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private base_url = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;
  constructor(private http: HttpClient) { }

  get params(){
    return {
      api_key: 'd838362d84ef952e5e4e4fcfc89392a9',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }
  resetCarteleraPage(){
    this.carteleraPage = 1;
  }
  getCartelera(): Observable<Movie[]> {

    if(this.cargando){
      return of([]);
    }
    this.cargando = true;

    return this.http.get<CarteleraResponse>
    (`${this.base_url}/movie/now_playing`, { params: this.params})
    .pipe(
      map( (resp) => resp.results),
      tap ( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas (texto: string): Observable<Movie[]>{
    const params = {...this.params, page: '1', query: texto};
    return this.http.get<CarteleraResponse>(`${this.base_url}/search/movie`, {params})
      .pipe(
        map( (resp) => resp.results)
      );

  }

  getPeliculaDetalle (id: string){
    return this.http.get<MovieResponse>(`${this.base_url}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(resp => of(null))
    );
  }

  getCast(id: string): Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.base_url}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError(resp => of(null))
    );
  }
}
