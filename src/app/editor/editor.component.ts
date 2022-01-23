import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  imageSrc:any ;
  blurPx:any = 0;
  brightness:any = 50;
  contrast:any=100;
  grayscale:any = 0;
  hue_rotate:any = 0;
  invert:any=0;
  opacity:any=0;
  saturate:any=0;
  sepia:any=0;
  Filters:Array<Preset>=[
    {Name:"Hudson",Filter:"contrast(90%) brightness(120%) saturate(110%)"},
    {Name:"F1977",Filter:"contrast(110%) brightness(110%) sepia(30%) grayscale(100%)"},
    {Name:"aden",Filter:"contrast(110%) brightness(110%) saturate(130%)"},
    {Name:"brooklyn",Filter:"contrast(90%) brightness(120%) saturate(85%) hue-rotate(20deg)"},
    {Name:"gingham",Filter:"brightness(105%) hue-rotate(350deg)"},
    {Name:"earlybird",Filter:"contrast(90%) sepia(20%)"},
    {Name:"inkwell",Filter:"contrast(110%) brightness(110%) sepia(30%) grayscale(100%)"},
    {Name:"lofi",Filter:"contrast(150%) saturate(110%)"}
  ];
   properities:Array<Property> =[
     {Name :"blur" , Value:"0" , MinValue:"0" , MaxValue:"100" ,type:Type.Pexel} ,
    {Name :"brightness" , Value:"100", MinValue:"0" , MaxValue:"200" ,type:Type.Percent},
    {Name :"contrast" , Value:"100", MinValue:"0" , MaxValue:"200" ,type:Type.Percent},
    {Name :"grayscale" , Value:"0", MinValue:"0" , MaxValue:"100" ,type:Type.Percent},
    {Name :"hue-rotate" , Value:"0", MinValue:"0" , MaxValue:"360" ,type:Type.Degree} ,
    {Name :"invert" , Value:"0", MinValue:"0" , MaxValue:"100" ,type:Type.Percent},
    {Name :"opacity" , Value:"100", MinValue:"0" , MaxValue:"100" ,type:Type.Percent},
    {Name :"saturate" , Value:"100", MinValue:"0" , MaxValue:"200" ,type:Type.Percent},
    {Name :"sepia" , Value:"0", MinValue:"0" , MaxValue:"100" ,type:Type.Percent}
  ]; 
  constructor() { }

  ngOnInit(): void {
  }
   readURL (event:any){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.Revert();
      const reader = new FileReader();
      var img = document.getElementById("Image");
      if(img != null)
      img.style.filter='';
     
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
  }
  }


  ApplyFilter(){
  var filter:string='';
  this.properities.forEach(element => {
    if(element.type == Type.Percent)
    filter+=element.Name+"("+element.Value+"%) ";
    else if (element.type == Type.Degree)
    filter+=element.Name+"("+element.Value+"deg) ";
    else if (element.type == Type.Pexel)
    filter+=element.Name+"("+element.Value+"px) ";
    else if (element.type == Type.NoUnit)
    filter+=element.Name+"("+element.Value+") ";
  });
  
  var img = document.getElementById("Image");
      if(img != null)
      img.style.filter=filter;
  }

  ApplyPreset(Preset:string){

    var img = document.getElementById("Image");
    if(img != null)
    img.style.filter=Preset;
  }
 
  Revert(){
    this.properities =  [
      {Name :"blur" , Value:"0" , MinValue:"0" , MaxValue:"100" ,type:Type.Pexel} ,
     {Name :"brightness" , Value:"100", MinValue:"0" , MaxValue:"200" ,type:Type.Percent},
     {Name :"contrast" , Value:"100", MinValue:"0" , MaxValue:"200" ,type:Type.Percent},
     {Name :"grayscale" , Value:"0", MinValue:"0" , MaxValue:"100" ,type:Type.Percent},
     {Name :"hue-rotate" , Value:"0", MinValue:"0" , MaxValue:"360" ,type:Type.Degree} ,
     {Name :"invert" , Value:"0", MinValue:"0" , MaxValue:"100" ,type:Type.Percent},
     {Name :"opacity" , Value:"100", MinValue:"0" , MaxValue:"100" ,type:Type.Percent},
     {Name :"saturate" , Value:"100", MinValue:"0" , MaxValue:"200" ,type:Type.Percent},
     {Name :"sepia" , Value:"0", MinValue:"0" , MaxValue:"100" ,type:Type.Percent}
   ]; 
   this.ApplyFilter();
  }
  
}
class Property {
  Name : any;
  Value:any;
  MinValue:any;
  MaxValue:any;
  type:Type = Type.Percent;
}
enum Type{
  Percent,
  Degree,
  Pexel,
  NoUnit
}
class Preset{
  Name:any;
  Filter:any;
}
