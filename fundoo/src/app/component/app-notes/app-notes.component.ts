import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UpdateComponent } from '../update/update.component'
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/search.service'
@Component({
  selector: 'app-app-notes',
  templateUrl: './app-notes.component.html',
  styleUrls: ['./app-notes.component.css']
})
export class AppNotesComponent implements OnInit {

  public message: string

  @Input() array
  @Output() eventEmit = new EventEmitter();
  public mytoken = localStorage.getItem('token');
  constructor(public dialog: MatDialog, private deletelabelService: HttpService, private data: DataService) { }

  ngOnInit() {
    this.view();
  }
  toggle = false;
  view() {
    this.data.currentView.subscribe(message => {
      this.toggle = message
    })
  }

  /**
   * 
   * @param event this function is used for refeshing.
   */
  refresh(event) {
    this.eventEmit.emit({})
  }

  /**
   * @description details of the notes on which it is click
   *  open a popup after click on note
   */
  openDialog(data): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '50%',
      data: data
      // data: {"title" :data.title, description:data.description, "id":data.id, "isDeleted":data.isDeleted, "color":data.color }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.eventEmit.emit({})
    });
  }

  deletelabel(noteid, labelid) {
    this.deletelabelService.labelAddpostData("/notes/" + noteid + "/addLabelToNotes/" + labelid + "/remove", "", this.mytoken)
      .subscribe(response => {
        console.log("sucessfully delete.......", response);
        this.eventEmit.emit({})
      })
  }

}


// ngOnInit() {
//   this.view();
// }
// toggle = false;
// view() {
//   this.data.currentView.subscribe(message => {
//     this.toggle = message
//   })
// }