import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();
  constructor( private heroeService: HeroesService) { }

  ngOnInit() {
  }

  save(form: NgForm){
    if(form.invalid){
      console.log('Formulario Inválido');
      return;
    }
    
    this.heroeService.createHero(this.heroe)
      .subscribe(resp=>{
        console.log(resp);
      });
  }

}
