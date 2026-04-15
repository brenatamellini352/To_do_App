import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Task } from '../../services/api';
import { Theme } from '../../services/theme';

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
  editingText = '';
  listTitle = '';
  saveMessage = '';

  constructor(
    private api: ApiService,
    private router: Router,
    public theme: Theme
  ) { }

  ngOnInit(): void {
    this.theme.init();
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = [...this.api.getTasks()];
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

  saveList(): void {
    if (!this.listTitle.trim()) {
      this.saveMessage = 'Dá um título para a lista antes de guardar.';;
      return;
    }
    if (!this.tasks.length) {
      this.saveMessage = 'Adiciona pelo menos uma tarefa antes de guardar.';
      setTimeout(() => this.saveMessage = '', 3000);
      return;
    }
    this.api.createList(this.listTitle.trim(), this.tasks.map(t => t.id));
    this.saveMessage = `Lista "${this.listTitle}" guardada com sucesso! ✅`;
    this.listTitle = '';
    setTimeout(() => this.saveMessage = '', 3000);
  }

  goToMinhasListas(): void {
    this.router.navigate(['/minhas-listas']);
  }

  logout(): void {
    this.api.logout();
    this.router.navigate(['/login']);
  }

  get greeting(): string {
    const hour = new Date().getHours();
    const user = this.api.getCurrentUser();
    const name = user?.name || 'utilizador';

    let period = '';
    if (hour >= 6 && hour < 12) period = 'Bom dia';
    else if (hour >= 12 && hour < 19) period = 'Boa tarde';
    else period = 'Boa noite';

    return `${period}, ${name}! 👋`;
  }
}