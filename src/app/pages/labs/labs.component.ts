import { CommonModule, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgForOf, NgIf,NgSwitchCase,NgSwitch,NgSwitchDefault],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  title: string = "¡Hola, Bienvenido al laboratorio de Angular!"; 
  colorControl = new FormControl();
  widthControl = new FormControl(50, {
  nonNullable:true
  
  }); 
  heightControl = new FormControl(50, {
  nonNullable:true
  
  });

  mainCtrl = new FormControl('', {
    nonNullable: true, 
    validators: [
      Validators.required, 
      Validators.minLength(6)
    ]
  })
  constructor() {
    //leer desde la logica
    this.colorControl.valueChanges.subscribe(value => {
      console.log(value); 
    })
  }
  joBworks = [
    "Instalar Angular", 
    "Crear Componentes", 
    "Maquetar diseño", 
    "Crear la lógica de negocio", 
    "Hacer pruebas unitarias"
  ]

  name: string = "martha"; 
  
  nombres = signal("Pedro");

  edad: number = 42;

  state: boolean = true; 
  img: string = "https://cdn.pixabay.com/photo/2020/11/20/16/26/labrador-5762115_1280.jpg"
  

  mascota = {
    nombre: "Pinto", 
    edad: "2 Meses", 
    animal: "perro", 
    raza: "pincher",
    hermanos: "si", 
    sexo: "Hembra", 
    nombreHermana: "Luneta"
  }
  


  persona = signal({
    nombre: "Anna", 
    edad: 34, 
    carrera: "Ing. Telematica", 
    ciudad: "Matamoros, Tamaulipas,México"
    
  }); 


  colores = signal(["verde","rojo", "azul", "amarillo", "blanco","morado"])

  clickHandler(event:any) {
    console.log(event);
    alert("Hola estas en mi laboratorio")
  }

  changeHandler(event: Event) {
    console.log(event);
    
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement; 
    console.log(input.value);
    console.log(event); 
  }


  keydownchangeHandler(event: Event) {
    
    const input = event.target as HTMLInputElement; 
    console.log(input.value);
    console.log(event);

    
  }


  clickHandlershift(event : Event) {
    
    console.log(event);
  }


  changeSignal(event: Event) {
    
    const input = event.target as HTMLInputElement; 
    const newValue = input.value; 
    
    this.nombres.set(newValue);    
  }


  changeAge(event: Event) {

    const input = event.target as HTMLInputElement; 
    const newEdge = input.value
    this.persona.update((newState) => {
      return {
        ...newState, 
        edad: parseInt(newEdge, 10)
      }
      
    })
    
  }


}
