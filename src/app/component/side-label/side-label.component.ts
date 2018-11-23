import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material';
// import { Router } from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-side-label',
  templateUrl: './side-label.component.html',
  styleUrls: ['./side-label.component.css']
})
export class SideLabelComponent implements OnInit {

  @Input() labelnamelistt
  constructor(public dialog:MatDialog, private noteLabelServices:HttpService,
  public route : ActivatedRoute) { }
  public mytoken = localStorage.getItem('token')
  public noteWithLabelList = []
  public label;

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.label=params['labelname'];
      this.notesWithList();

    })
  }

  refresh(event){
    if(event){
      console.log("event in label")
      this.notesWithList();
    }
  }
 


  notesWithList(){
    console.log("label name.....",this.label);
    this.noteWithLabelList=[]
    this.noteLabelServices.labelAddpostData("notes/getNotesListByLabel/"+this.label,null,this.mytoken)
    .subscribe(response=>{
      console.log("notesWithList response",response);
      console.log("length.......",response['data'].data.length);
      
      for(var i=0; i<response['data'].data.length; i++)
      {
        this.noteWithLabelList.push(response['data'].data[i])
      }
      console.log("noteWithLabelList...............",this.noteWithLabelList);
      
    })
  }

}