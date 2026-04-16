import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, TaskList, Task } from '../../services/api';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-minhas-listas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './minhas-listas.html',
  styleUrl: './minhas-listas.css'
})
export class MinhasListas implements OnInit {
  lists: TaskList[] = [];
  expandedListId: string | null = null;
  editingTaskId: number | null = null;
  editingText: string = '';
  editingListId: string | null = null;

  constructor(
    private api: ApiService,
    private router: Router,
    public theme: Theme
  ) { }

  ngOnInit(): void {
    this.theme.init();
    this.loadLists();
  }

  loadLists(): void {
    this.lists = this.api.getLists();
  }

  toggleExpand(id: string): void {
    this.expandedListId = this.expandedListId === id ? null : id;
    this.editingTaskId = null;
    this.editingListId = null;
  }

  toggleTask(listId: string, taskId: number): void {
    this.api.toggleListTask(listId, taskId);
    this.loadLists();
  }

  startEditTask(listId: string, task: Task): void {
    this.editingListId = listId;
    this.editingTaskId = task.id;
    this.editingText = task.text;
  }

  confirmEditTask(listId: string): void {
    if (!this.editingText.trim() || this.editingTaskId === null) return;
    const list = this.lists.find(l => l.id === listId);
    if (!list) return;
    const updatedTasks = list.tasks.map(t =>
      t.id === this.editingTaskId ? { ...t, text: this.editingText.trim() } : t
    );
    this.api.updateList(listId, updatedTasks);
    this.editingTaskId = null;
    this.editingListId = null;
    this.loadLists();
  }

  deleteList(id: string): void {
    this.api.deleteList(id);
    this.loadLists();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  formatDate(ts: number): string {
    return new Date(ts).toLocaleDateString('pt-PT', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  completedCount(list: TaskList): number {
    return list.tasks.filter(t => t.completed).length;
  }
}