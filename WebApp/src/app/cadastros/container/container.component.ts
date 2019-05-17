import { Component, OnInit } from '@angular/core';
import { Container } from './model/container';
import { ContainerService } from './container.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  containerModel: Container;

  constructor(private containerService: ContainerService) { }

  ngOnInit() {
    this.containerModel = new Container();
  }

  salvar(){
    console.log("salvar container")
    console.log(this.containerModel)
    this.containerService.save(this.containerModel).subscribe(sucesso => {
      if (sucesso != null) 
        console.log("sucesso");
      
    },
    error => {
      console.log("Erro");
    });
  }

}
