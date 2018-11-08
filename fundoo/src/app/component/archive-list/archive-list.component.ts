import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from '../../services/http.service';
import { UpdateComponent } from '../update/update.component'

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css']
})
export class ArchiveListComponent implements OnInit {

  @Input() archlistt
  @Output()
  eventEmit= new EventEmitter();
  public mytoken=localStorage.getItem('token')
  public archiveList=[]
  constructor(public dialog: MatDialog, private archiveService:HttpService,private deletelabelService:HttpService) { }


  ngOnInit() {
    this.getArchiveNotes();
  }
  refresh(event) {
    if(event) {
      this.eventEmit.emit({})
    }
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '500px',
      data: {"title" :data.title, description:data.description, "id":data.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 

  getArchiveNotes(){
    this.archiveService.getnotesdata("/notes/getArchiveNotesList",this.mytoken)
    .subscribe(response=>{;
      console.log(response);
      for(var i=0; i<response['data'].data.length; i++)
      {
        this.archiveList.push(response['data'].data[i])
      }
    })
  }

  deletelabel(noteid,labelid){
    this.deletelabelService.labelAddpostData("/notes/"+noteid+"/addLabelToNotes/"+labelid+"/remove" ,"",this.mytoken)
    .subscribe(response=>{
      this.eventEmit.emit({})
    })
  }

}
