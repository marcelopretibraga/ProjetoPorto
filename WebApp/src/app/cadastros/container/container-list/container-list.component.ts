import { Component, OnInit, ViewChild } from '@angular/core';
import { ContainerService } from '../container.service';
import { Container } from '../model/container';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DialogComponent } from '../../../shared/dialog/dialog/dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent implements OnInit {

  public displayedColumns = ['actionsColumn','containerId', 'descricao', 'largura',
   'altura', 'comprimento', 'capacidade', 'dtVencimento', 'tipo', 'dtCadastro'];
  private dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private containerService: ContainerService, 
              private router: Router,
              private dialog: MatDialog, 
              private datePipe: DatePipe) {}

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.containerService.listAll()
      .subscribe(response => {
        if (response != null) {
          this.dataSource = new MatTableDataSource<Container>(response);
          this.dataSource.paginator = this.paginator;          
          this.dataSource.sort = this.sort;
        }
      },
        error => {
        }
      )
  }

  callUpdate(id: number){
    this.router.navigate(['../container-edit/'+id]);
  }

  callNew(){
    this.router.navigate(['../container']);
  }

  deleteConfirmation(id: number) { 
    let dialogRef = this.dialog.open(DialogComponent, {      
      panelClass: 'custom-dialog',      
      data: 'Confirmar exclusão do registro ?',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(isConfirm => {
        if(isConfirm)
          this.remove(id);    
    }); 
  }

  remove(id : number) {    
    this.containerService.remove(id).subscribe(data => {    
      if (data != null)
        this.listAll();
    });
  }


}
