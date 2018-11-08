import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private updateService: HttpService) { }

  @Output()
  eventUpdate = new EventEmitter(); 
  public mytoken = localStorage.getItem('token')
  public isDelete = false;
  public labels=[];


  ngOnInit() {
    this.isDelete = this.data['isDeleted']
    this.labels=this.data["noteLabels"];
  }

  refresh(event) {
    if (event) {
      this.eventUpdate.emit({})
    }
  }

  /**
   * @description here we are displaying the note and updating the note
   */
  closeClick(title, description) {
    var body = {
      "title": title,
      "description": description,
      "noteId": this.data.id,
    }

    this.updateService.updateNotes("/notes/updateNotes", body, this.mytoken
    ).subscribe(response => {
      console.log(response);
     
    },
      error => {
        console.log("error");
      })
  }

  update(){
    this.dialogRef.close();
  }


}