import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, TaskList, Task } from '../../services/api';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-minhas-listas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minhas-listas.html',
  styleUrl: './minhas-listas.css'
})
export class MinhasListas implements OnInit {
  lists: TaskList[] = [];
  allTasks: Task[] = [];
  expandedListId: string | null = null;

  constructor(
    private api: ApiService,
    private router: Router,
    public theme: Theme
  ) {}

  ngOnInit(): void {
    this.theme.init();
    this.lists = this.api.getLists();
    this.allTasks = this.api.getTasks();
  }

  getTasksForList(list: TaskList): Task[] {
    return this.allTasks.filter(t => list.taskIds.includes(t.id));
  }

  toggleExpand(id: string): void {
    this.expandedListId = this.expandedListId === id ? null : id;
  }

  deleteList(id: string): void {
    this.api.deleteList(id);
    this.lists = this.api.getLists();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  formatDate(ts: number): string {
    return new Date(ts).toLocaleDateString('pt-PT', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }
}