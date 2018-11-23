import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from "@angular/router";
// ...................
import { MatDialog } from '@angular/material';
import { CreateLabelComponent } from '../create-label/create-label.component'
import {DataService} from '../../services/search.service'
// ...................
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() array
  @Output()
  eventNotelabelList = new EventEmitter();

  public showCard:Boolean = false;

  constructor(private logoutservices:HttpService, private router:Router, public dialog:MatDialog,
  private noteAddService:HttpService,private noteLabelServices:HttpService,private data
  :DataService) { }
  public mytoken = localStorage.getItem('token')
  public labelNameList;
  public ListOfLabel;
  public noteWithLabelList = [];
  public string:string;
  ngOnInit() {
    this.labelshow();
  }
  refresh(event){
    if(event){
      console.log("Event happened");
      this.labelNameList=[];
      this.labelshow();
    }
  }
  logoutcard(){
    this.showCard = true;
  }

  logout(){
    console.log("inside logout", this.mytoken);
    
    this.logoutservices.logoutpostData("user/logout",this.mytoken).subscribe(response=>{
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
    },error=>{
      console.log("error ");
    });
  }

  
// ..............................
  createLabel(): void {
    const dialogRef = this.dialog.open(CreateLabelComponent, {
      width: '300px'});

    dialogRef.afterClosed().subscribe(result => {
    });
  } 
// ...............................


// ...................................
labelshow(){
  this.noteAddService.getnotesdata("/noteLabels/getNoteLabelList",this.mytoken)
  .subscribe((response) =>{
    this.labelNameList=[];

    for(var i=0;i<response["data"].details.length;i++){
      if(response["data"].details[i].isDeleted == false){
      this.labelNameList.push(response["data"].details[i].label);
      }
    }
    console.log("label list.......",this.labelNameList);
    this.labelNameList.sort();
    this.ListOfLabel=response["data"].details;
    return;
  },(error) => {
    console.log("failed");
    console.log(error);
  });
}
// ..................................................
archive(){
  this.router.navigate(['navbar/archive'])
}

// .......................................................
notesWithList(label){
  console.log("label name.....",label);
  this.router.navigate(['navbar/label/'+label])
}

notes(){
  console.log("inside notes............");
  
  this.router.navigate(['navbar/main-notes'])
}

trashnote(){
  this.router.navigate(['navbar/trash'])
}

searchtest(){
  this.data.changeMessage(this.string)
  // console.log('string in nav',this.string);
  this.router.navigate(['navbar/search'])
}

grid=0;
 viewList(){
  this.grid=1;
  this.data.changeView(true);
 }
 viewGrid(){
  this.grid=0;
  this.data.changeView(false);
 }

}
