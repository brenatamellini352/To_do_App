import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Task } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  editingTaskId: number | null = null;
  editingText: string = '';
  isDarkTheme = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
    const saved = localStorage.getItem('theme');
    this.isDarkTheme = saved !== 'light';
  }

 loadTasks(): void {
  // Atribuir o retorno da API diretamente à variável do componente
  this.tasks = [...this.api.getTasks()]; 
  console.log('Tarefas carregadas:', this.tasks); // Adicione esse log para testar
}

  add_task(): void {
    if (!this.newTaskTitle.trim()) return;
    this.api.addTask(this.newTaskTitle.trim());
    this.newTaskTitle = '';
    this.loadTasks();
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editingText = task.text;
  }

  confirmEdit(id: number): void {
    if (this.editingText.trim()) {
      this.api.editTask(id, this.editingText.trim());
      this.editingTaskId = null;
      this.loadTasks();
    }
  }

  deleteTask(id: number): void {
    this.api.deleteTask(id);
    if (this.editingTaskId === id) this.editingTaskId = null;
    this.loadTasks();
  }

  toggleTask(id: number): void {
    this.api.toggleTask(id);
    this.loadTasks();
  }

  get progressValue(): number {
    if (!this.tasks.length) return 0;
    return Math.round((this.tasks.filter(t => t.completed).length / this.tasks.length) * 100);
  }

  toggle_theme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    document.body.setAttribute('data-theme', this.isDarkTheme ? '' : 'light');
  }

  logout(): void {
    this.api.logout();
    this.router.navigate(['/login']);
  }
}