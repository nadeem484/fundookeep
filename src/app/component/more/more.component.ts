import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
// ...................
// import { AddLabelComponent } from '../add-label/add-label.component';
// import { MatDialog } from '@angular/material';
// ...................

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
  @Input() model

  @Output() eventEmitmore =new EventEmitter();
  @Output() deleteClick = new EventEmitter(); //creatintg eventEmitter object here.
  @Output() chipupdate=new EventEmitter()
  
  public mytoken=localStorage.getItem('token') //getting token from local storage.
  constructor(private deleteService:HttpService, private addlabelServices :HttpService, public snackBar: MatSnackBar) { }
  public isDelete=false;
  public string = "note trashed"

  ngOnInit() {
    if(this.model){
      this.isDelete=this.model.isDeleted;
      if(this.model.isDeleted==true)
       this.string="note trashed"
    }
  }

  refresh(event) {
    if(event) {
      this.eventEmitmore.emit({})
    }
  }

  /**
   * @description in this function we are calling delete note api
   */
  deleteNotes(){
    var listarr=[];
    listarr.push(this.model.id)
    var body = {
      "isDeleted":true,
      "noteIdList":listarr
    }

    this.deleteService.notesDelete("notes/trashNotes",body,this.mytoken).subscribe(response=>{
      console.log(response);
      this.deleteClick.emit(true);
    },error=>{
      console.log("failed to delete notes");
    }
  )
  }

  updatechip(event){
  this.chipupdate.emit(event)
  }


    remove(){
      // debugger;
    var listarr=[];
    listarr.push(this.model.id)
    var body = {
      "isDeleted":!this.isDelete,
      "noteIdList":listarr
    }

    this.deleteService.notesDelete("notes/trashNotes",body,this.mytoken).subscribe(response=>{
      console.log(response);
      this.deleteClick.emit(true);
      this.snackBar.open(this.string,"undo", {
        duration: 2000,
      });

      
    },error=>{
      console.log("failed to delete notes");
    }
  )
  }

}
