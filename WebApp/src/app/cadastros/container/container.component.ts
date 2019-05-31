import { Component, OnInit } from '@angular/core';
import { Container } from './model/container';
import { ContainerService } from './container.service';
import { ActivatedRoute, Router,  } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  containerModel: Container;
  edit : boolean;

  constructor(private containerService: ContainerService, 
             private activeRoute: ActivatedRoute, 
             public router: Router) { }

  ngOnInit() {
    this.containerModel = new Container();
    this.activeRoute.params.subscribe(param => {
      if (param.id != undefined){//verificar se e edição
        this.getById(param.id);
        this.edit = true;
      }        
    });

  }

  getById(id :number){
    this.containerService.getById(id).subscribe(sucesso => {
      if (sucesso) 
        this.containerModel = sucesso;
    }, error => {
      console.log(error);
    });
  }


  salvar(){
    if (!this.edit){
      this.containerService.save(this.containerModel).subscribe(sucesso => {
        if (sucesso) 
          this.back();
          
      },
      error => {
        console.log("Erro");
      });
    }else {
      this.containerService.update(this.containerModel).subscribe(sucesso => {
        if (sucesso) 
          this.back();
      },
      error => {
        console.log("Erro");
      });
    }
  }

  back() {
    this.router.navigate(['../container-list']);
  }
   
}
