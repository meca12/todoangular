import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Taks } from '../../models/taks.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,CommonModule,NgIf,ReactiveFormsModule,NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  newTakscrtl = new FormControl("", {
    nonNullable: true, 
    validators: [Validators.required]
  })
  tasks = signal<Taks[]>([]); 

  filter=signal<'all'| 'pending' | 'completed' | 'clearCompleted'>('all');
  taskByFilter = computed(() => {
    const filter = this.filter(); 
    const tasks = this.tasks(); 

    if (filter === "pending") {

      // muestra todas las tareas no completadas o estado de false
      return tasks.filter(task => !task.complete)
    }
    if (filter === "completed") {
       // muestra las  tareas completadas o estado de true
      return tasks.filter(task=> task.complete)
      
    }
    if (filter === "clearCompleted") { 

      return tasks.filter(tasks => !tasks.complete);

      
    }

    // muestra todas las tareas
    return tasks;
  
  })
  
  injector = inject(Injector); 

  constructor() {
   

  }

  ngOnInit(): void {
   
    const storage = localStorage.getItem('tasks'); // -> pregunta si el storage  esta vacio

    // si el  storage  existe 
    if (storage) {

      const tasks = JSON.parse(storage) // pasamos  el   stoorage  para que sea  un objeto un  array de elemnetos
      this.tasks.set(tasks) // actualiza  los  objetos  para agregarlo al  array 
       }
     
    this.TrackingSignal(); // muestra las tareas aun que  refresques la web 
 }
  
   // es pa local storage 
    // efect  no retorna como computer que hace un calculo
    //vigila  un estado y emite  una lógica  a partir  de este y lo guarda  en local storage
  //  este  es  solo  un tracking cuando  un signal cambia
  

  TrackingSignal() {
    effect(() => {
      const tasks = this.tasks(); 
      localStorage.setItem('tasks', JSON.stringify(tasks)); // -> se convierte  un array de objetos en un texto para guardarse en  el local storages 
    },{injector:this.injector})
  }

  getNewtaks() {
    if (this.newTakscrtl.valid) {
      const value = this.newTakscrtl.value.trim();
      if (value != '') {
       this.updateObject(value);
      this.newTakscrtl.setValue('');   
      }
     
  }
      
      
    /* con push 
    this.taks().push(newInput)

    */
    /*update  nos permite modificar o agregar  un nuevo valor
    pero no  borrarlo o resetarlo desde cero, update es una propiedad de los 
    signals*/
    


       
    
  }



  updateObject(title: string) {
  
    const newInput = {
      id: Date.now(),
      title:title,
      complete: false
    };
     this.tasks.update((tasks) => [...tasks, newInput]);
    
  }

  removesTaks(index: number) {

  this.tasks.update(tasks => tasks.filter((tasks,position)=> position !== index))
   
    
    
  }


  completeTaks(index:number) {
    this.tasks.update((tasks) => {
      return tasks.map((tasks, position) => {
        if (position === index) {
          return {
            ...tasks,
            complete: !tasks.complete
          }
        }
        
        return tasks;
           
      })
     
      
   }) 
  
  }

  editTaks(index:number) {
    
    this.tasks.update((tasks) => {
      return tasks.map((tasks, position) => {
        if (position === index) {
          return {
            ...tasks,
            editing:true
          }
        }
        
        return {
           ...tasks,
            editing:false
        };
           
      })
     
      
   }) 
  }
  updateTaksText(index: number, event: Event) {
    const newText = event.target as HTMLInputElement; 
    const valueText = newText.value
    this.tasks.update((tasks) => {
      return tasks.map((tasks, position) => {
        if (position === index) {
          return {
            ...tasks,
            title:valueText,
            editing:false
          }
        }
        
        return tasks;
           
      })
     
      
   })
    
  }


  changeFilter(filter:'all'| 'pending' | 'completed' | 'clearCompleted') {
    
    this.filter.set(filter); 
    
  }


  
  clearTakscompleted(filter: 'clearCompleted') {
    this.filter.set(filter); 
 }

}
