import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { MatDialogRef } from '@angular/material';
// import { MoreComponent } from '../more/more.component';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {

  @Input() note
  @Output() clickbox = new EventEmitter();
  @Output()
  updatechip = new EventEmitter();
  public ListOfLabel;
  public mytoken = localStorage.getItem('token')
  public check: boolean = false;
  public label_id;

  constructor(private noteAddService: HttpService, private sendlabelServices: HttpService, private deletelabelService: HttpService) { }

  ngOnInit() {
    this.labelshow()
    
  }

  /**
   * @description getting data from backend
   */

  labelshow() {
    this.noteAddService.getnotesdata("noteLabels/getNoteLabelList", this.mytoken)
      .subscribe((response) => {
        this.ListOfLabel = [];
        for (var i = 0; i < response["data"].details.length; i++) {
          if (response["data"].details[i].isDeleted == false) {
            this.ListOfLabel.push(response["data"].details[i]);
          }
        }

        if (this.note.noteLabels != undefined) {
          for (var i = 0; i < this.ListOfLabel.length; i++) {
            for (var j = 0; j < this.note.noteLabels.length; j++) {
              if (this.ListOfLabel[i].id == this.note.noteLabels[j].id) {
                this.ListOfLabel[i].isChecked = true;
              }
            }
          }
        }


      }, (error) => {
        console.log(error);
      });
  }



  /**
   * 
   * @param lablid @description calling addlabellnotes api removelabel api
   */
  addAndDeletelabel(label) {

    this.updatechip.emit(label)
    if (label.isChecked == undefined && this.note != undefined) {
      this.sendlabelServices.labelAddpostData("/notes/" + this.note.id + "/addLabelToNotes/" + label.id + "/add", "", this.mytoken)
        .subscribe(response => {
          this.clickbox.emit({})
        })
    }

    if (label.isChecked == true && this.note != undefined) {
      this.deletelabelService.labelAddpostData("/notes/" + this.note.id + "/addLabelToNotes/" + label.id + "/remove", "", this.mytoken)
        .subscribe(response => {
          this.clickbox.emit({})

        })
    }
  }
}
