import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-main-notes',
  templateUrl: './main-notes.component.html',
  styleUrls: ['./main-notes.component.css']
})
export class MainNotesComponent implements OnInit {

  @Input() array
  constructor(private adddata: HttpService, private deleteService: HttpService, ) { }
  public mytoken = localStorage.getItem('token')
  public id = localStorage.getItem("userid")
  public arr = [];

  ngOnInit() {
    this.getNotes();
  }

  refresh(event) {
    if (event) {
      this.getNotes();
    }
  }

  getNotes() {
    console.log("token", this.mytoken);
    this.adddata.getnotesdata("notes/getNotesList", this.mytoken).subscribe((response) => {
      this.arr = [];
      for (var i = response['data'].data.length; i > 0; i--) {
        //here it will note consider deleted node
        if (response["data"].data[i - 1]["isDeleted"] == false) {
          if (response["data"].data[i - 1]["isArchived"] == false) {
            this.arr.push(response["data"].data[i - 1])
          }
        }
      }
    }, error => {
      console.log("error");
    }
    )
  }

}
