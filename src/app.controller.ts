import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { response } from 'express';
import { DataSzallasDto } from './dataSzallas.dto';
import { Response } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  #szallasok: DataSzallasDto[] = [];
  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('/szallas')
  @Render('alma')
  ujSzallas() {
    return {
      message: "Szálláshely",
      hibak: [],
      ujSzallas: []
    }
  }
  
  
  @Post('/szallas')
  ujSzallasPost(@Body() ujSzallas: DataSzallasDto, /*@Res() response: Response*/){

    const hibak: string[] = [];
    let tranzakcio = new DataSzallasDto();
    let valami: string[] = ['Nev','Email','Idopont','Vendegek']
    for (let i = 0; i < valami.length; i++) {
      if (!tranzakcio[valami[i]]) {
        hibak.push('Kérem, minden (kötelező) mezőt töltsön ki!')
        break;
      }
    }
 
    if(ujSzallas.Nev =="" || ujSzallas.Email =="" || ujSzallas.Idopont =="" || ujSzallas.Vendegek == ""){
      hibak.push('Ne legyen üres mező! Kérlek, minden mezőt tölts ki.')
    }
    
    if(Date.parse(ujSzallas.Idopont)<Date.now()){
        hibak.push('Nem lehet korábbi dátum!')
    }
      
    
      
    //response.render('ujSzallas', { hibak, ujSzallas })
    return;

    

  }
  
}
