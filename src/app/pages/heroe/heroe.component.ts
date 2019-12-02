import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
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
    
    Swal.fire({
      title: 'Please Wait',
      text: 'Saving Information',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    
    let peticion: Observable<any>;

    if(this.heroe.id){
      peticion = this.heroeService.updateHero(this.heroe);
    }else{
      peticion = this.heroeService.createHero(this.heroe);
    }
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.name,
        text: 'Information Saved',
        icon: 'success'
      });
    });
  }

}
