import { AuthService } from './../Shared/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  result: Array<any> = [];
  getDevelopmentData: any = [];
  value: any = null;
  error: any = null;
  changed: any = true;
  alert:boolean=false;

  customerData: any = [
    { label: 'YADA', value: 'YADA' },
    { label: "Coteng", value: 'CTNG' },
    { label: 'EXTL', value: 'EXTL' }
  ];


  constructor(private authService: AuthService, private dialog:MatDialog)
    {
     this.selectedCustomer = this.customerData[0];
    }


  selectedCustomer: any = null;


  ngOnInit(): void {
    this.loadData();
    this.getDevelopmentTypeData();
  }

  loadData(): void {
    this.authService.getData(this.selectedCustomer.value).subscribe(res => {
      this.result = res;
      console.log(this.result);
    })
  }

 

  updateData(){
    this.authService.updateData(this.result).subscribe(res=>{
     this.loadData();
    })
  }
 

  onCustomerChange(e: any) {
    this.result = [];
    console.log(e);
    this.loadData();

  }

  getDevelopmentTypeData() {
    this.authService.getDevelopmentTypeList().subscribe(res => {
      this.getDevelopmentData = res;
    })
  }



  openDeleteDialog(item:any){
      
    let dialogRef =  this.dialog.open(DeleteDialogComponent, {
      width: '600px', 
      position: {top:"10px"}
    });

    dialogRef.afterClosed().subscribe(res=>{ 
      if(res){
        console.log(res);
        const index = this.result.indexOf(item);
        this.result.splice(index,1);
        dialogRef.close();
      }
    })

  }

  openAddDialog(){
      
    let dialogRef =  this.dialog.open(AddDialogComponent, {
      width: '600px', 
      position: {top:"10px"},
      data:this.getDevelopmentData
    });

    dialogRef.afterClosed().subscribe(res=>{ 
      if(res){
        console.log(res);
        let newObj = {
          CacheKey: null,
          CstmrId: this.selectedCustomer.value,
          DvlpmntTypDscrptn: res.description,
          DvlpmntTypIdNmbr: res.dt,
          EncryptIndr: "Y",
          ExtrctSttsFlg:res.status,
          UsrId: localStorage.getItem("userName")
        }
        this.result.unshift(newObj);
        this.changed= false;
      }
    })
  }

  onClickClipboard(){

   let dataString = "DT,STATUS,DT DESCRIPTION\n";

   this.result.forEach(function(item) { dataString += [item.DvlpmntTypIdNmbr,item.ExtrctSttsFlg,item.DvlpmntTypDscrptn].join(',') + '\n';  });
    
   this.copyToClipboard(dataString);
   
   this.bootstrapAlert();
  
  }


  copyToClipboard(text:any) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }

  bootstrapAlert(){
    this.alert = ! this.alert;
    setTimeout(()=> this.alert = false, 3000)
  }
 
}
  
 

