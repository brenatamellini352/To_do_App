import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  newTaskTitle: string = '';
  tasks: any[] = [];
  progressValue: number = 0;

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.tasks.push({ title: this.newTaskTitle, completed: false });
      this.newTaskTitle = '';
      console.log('Tarefa adicionada!', this.tasks);
    }
  }

  toggle_theme() {
    console.log('Alternando tema...');
  }
}
