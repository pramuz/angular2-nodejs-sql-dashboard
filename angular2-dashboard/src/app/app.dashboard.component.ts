import { Component ,ViewContainerRef,OnInit,forwardRef,SimpleChanges,OnChanges,ElementRef  } from '@angular/core';
import { MdDialogRef ,MdDialog,MdDialogConfig} from '@angular/material';
import { HttpService } from './app.http.service';

declare var d3: any;

@Component({
  selector: 'my-dashboard',
   templateUrl: './dashboard.Component.html',
   providers:[HttpService]
   
})
export class DashboardComponent  {
  
 private data:any[] = [];
 
    public filterQuery = "";
    public rowsOnPage = 6;
    public sortBy = "FirstName";
    public sortOrder = "asc";
  
  dataTable: any[] = [];
  postdata: string;
  selectedOption: string;

  constructor(public dialog: MdDialog,private _httpService:HttpService,private viewContainerRef:ViewContainerRef) {
    this.onGetData()
   
  }
  public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.City.length;
    }
  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent,{
  width: '400px',
  disableClose: true
    });
  dialogRef.afterClosed().subscribe(result => {
      this.onGetData()
    });
  }
    onGetData(){
        this._httpService.getDataList()
            .subscribe(
                data => this.data = data,
                error => alert(error)
            );
    }
    
  ngOnInit() {
  
   this.openchart();
    }
    openchart(){

       var w = 600;
var h = 250;

var dataset = [ 
	{ key: 0, value: 5 },
	{ key: 1, value: 10 },
	{ key: 2, value: 13 },
	{ key: 3, value: 19 },
	{ key: 4, value: 21 },
	{ key: 5, value: 25 },
	{ key: 6, value: 22 },
	{ key: 7, value: 18 },
	{ key: 8, value: 15 },
	{ key: 9, value: 13 },
	{ key: 10, value: 11 },
	{ key: 11, value: 12 },
	{ key: 12, value: 15 },
	{ key: 13, value: 20 },
	{ key: 14, value: 18 },
	{ key: 15, value: 17 },
	{ key: 16, value: 16 },
	{ key: 17, value: 18 },
	{ key: 18, value: 23 },
	{ key: 19, value: 25 } ];

var xScale = d3.scale.ordinal()
				.domain(d3.range(dataset.length))
				.rangeRoundBands([0, w], 0.05); 

var yScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) {return d.value;})])
				.range([0, h]);

var key = function(d) {
	return d.key;
};

//Create SVG element
var svg = d3.select("body #chartRender")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

//Create bars
svg.selectAll("rect")
   .data(dataset, key)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
		return xScale(i);
   })
   .attr("y", function(d) {
		return h - yScale(d.value);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
		return yScale(d.value);
   })
   .attr("fill", function(d) {
		return "rgb(0, 0, " + (d.value * 10) + ")";
   })	;

//Create labels
svg.selectAll("text")
   .data(dataset, key)
   .enter()
   .append("text")
   .text(function(d) {
		return d.value;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
		return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
		return h - yScale(d.value) + 14;
   })
   .attr("font-family", "sans-serif") 
   .attr("font-size", "11px")
   .attr("fill", "white");
   
var sortOrder = false;
var sortBars = function () {
    sortOrder = !sortOrder;
    
   var sortItems = function (a, b) {
        if (sortOrder) {
            return a.value - b.value;
        }
        return b.value - a.value;
    };

    svg.selectAll("rect")
        .sort(this.sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .attr("x", function (d, i) {
        return xScale(i);
    });

    svg.selectAll('text')
        .sort(this.sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .text(function (d) {
        return d.value;
    })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
    })
        .attr("y", function (d) {
        return h - yScale(d.value) + 14;
    });
};


    }

    remove(datadel:any){
        this._httpService.getDataDel(datadel.PersonID).subscribe(
                data => {
                  
                  if(data.status===true){
                    this.onGetData()
                  }
                },
                error => alert(error)
            );
    }
    onPostData(datasend:any){
      this._httpService.getPostdataList(datasend).subscribe(
                data => this.postdata = JSON.stringify(data),
                error => alert(error)
          );
    }
    
}


@Component({
  selector: 'dialog-result',
  template: `
   
 <div >
  <a class="closeleft"  (click)="dialogRef.close()"> <i class="fa fa-close" aria-hidden="true"></i></a>

    <form #addUpdate="ngForm" novalidate >
     <div class="col-md-12">
        <div class="col-md-5 form-group text-right"><label>First Name:</label></div>
        <div class="col-md-7 form-group">
          <input type="text"[(ngModel)]="tableData.FirstName" name="FirstName" #FirstName="ngModel" required maxlength="10">
            <div *ngIf="FirstName.errors && FirstName.touched" class="error">
            <span [hidden]="!FirstName.errors.required">FirstName is required. </span>
            <span [hidden]="!FirstName.errors.maxlength">Max length is 10 character.</span>
        </div>
        </div>
    </div>
     <div class="col-md-12">
        <div class="col-md-5 text-right"><label>Last Name:</label></div>
        <div class="col-md-7 form-group">
          <input type="text"[(ngModel)]="tableData.LastName" name="LastName" #LastName="ngModel" required maxlength="10">
            <div *ngIf="LastName.errors && LastName.touched" class="error">
                <span [hidden]="!LastName.errors.required">LastName is required. </span>
                <span [hidden]="!LastName.errors.maxlength">Max length is 10 character.</span>
            </div>
        </div>
    </div>
   
    <div class="col-md-12">
        <div class="col-md-5 form-group text-right"><label>Address:</label></div>
        <div class="col-md-7 form-group">
          <input type="text"[(ngModel)]="tableData.Address" name="Address" #Address="ngModel" required maxlength="10">
            <div *ngIf="Address.errors && Address.touched" class="error">
                <span [hidden]="!Address.errors.required">Address is required. </span>
                <span [hidden]="!Address.errors.maxlength">Max length is 10 character.</span>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <div class="col-md-5 form-group text-right"><label>City:</label></div>
        <div class="col-md-7 form-group">
          <input type="text"[(ngModel)]="tableData.City" name="City" #City="ngModel" required maxlength="10">
            <div *ngIf="City.errors && City.touched" class="error">
                <span [hidden]="!City.errors.required">Address is required. </span>
                <span [hidden]="!City.errors.maxlength">Max length is 10 character.</span>
            </div>
        </div>
    </div>   
       <div class="col-md-12">
        <div class="col-md-5 form-group"></div>
        <div class="col-md-7 form-group">
          <button type="submit" md-raised-button  [disabled]="!addUpdate.valid" (click)="submitForm(addUpdate.value)" (click)="dialogRef.close()"   >Submit</button>
        </div>
    </div>  
      
           
      
    </form>
  </div>
    
  `,
  styles:[
   `
    .error{
      color:red
    }
    .closeleft{
             float: right;
    background: #f1f1f1;
    padding: 2px 8px;
    border-radius: 7px;
    cursor: pointer;
    position: relative;
    top: -15px;
    }
   `
  ],
  providers:[DashboardComponent,HttpService]
})
export class DialogComponent {
  constructor(public dialogRef: MdDialogRef<DialogComponent>,private dashboardComponent:DashboardComponent) {}
  private tableData;
  ngOnInit(){
    this.tableData={
      LastName:"",
      FirstName:"",
      Address:"",
      City:""
    }
  }
   submitForm(form: any): void{
    console.log('Form Data: ');
    console.log(form);
   
  this.dashboardComponent.onPostData(form)
}

}