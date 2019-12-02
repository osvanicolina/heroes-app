import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://login-app-aa49d.firebaseio.com';

  constructor(private http: HttpClient){
  
  }

  createHero(hero: HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, hero)
            .pipe(
              map( resp => {
                hero.id = resp['name'];
                return hero;
              })
            );
  }
}
