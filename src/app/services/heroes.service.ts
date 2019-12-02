import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

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

  updateHero(hero: HeroeModel){
    const heroeTemp = {
      ...hero
    };
    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${hero.id}.json`, heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
        .pipe(
          map( this.createHeroArray ),
          delay(1500)
        );
  }
  
  getHero(id: string){
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  deleteHero(id: string){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }


  private createHeroArray(heroesObj: object){

    const heroes: HeroeModel[] = [];
    if(heroesObj === null ) {return[];}

    Object.keys(heroesObj).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }
}
