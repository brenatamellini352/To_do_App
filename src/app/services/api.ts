import { Injectable } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  userId: string;
}

export interface ApiResult<T = User> {
  ok: boolean;
  message?: string;
  user?: T;
}

export interface TaskList {
  id: string;
  userId: string;
  title: string;
  createdAt: number;
  tasks: Task[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {

  register(name: string, email: string, password: string): ApiResult {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      return { ok: false, message: 'Email já registado' };
    }
    const user: User = { id: Date.now().toString(), name, email, password };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return { ok: true, user };
  }

  login(email: string, password: string): ApiResult {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, message: 'Credenciais inválidas' };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { ok: true, user };
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  getTasks(): Task[] {
    const user = this.getCurrentUser();
    if (!user) return [];
    const all: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    return all.filter(t => t.userId === user.id);
  }

  private saveAllTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // --- Listas ---

  getLists(): TaskList[] {
    const user = this.getCurrentUser();
    if (!user) return [];
    const all: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
    return all.filter(l => l.userId === user.id);
  }

  private saveAllLists(lists: TaskList[]): void {
    localStorage.setItem('taskLists', JSON.stringify(lists));
  }

  createList(title: string, tasks: Task[]): TaskList | null {
    const user = this.getCurrentUser();
    if (!user) return null;
    const all: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
    const newList: TaskList = {
      id: Date.now().toString(),
      userId: user.id,
      title,
      createdAt: Date.now(),
      tasks: tasks.map(t => ({ ...t }))
    };
    all.push(newList);
    this.saveAllLists(all);
    return newList;
  }
  addTask(text: string): Task | null {
    const user = this.getCurrentUser();
    if (!user) return null;
    const all: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTask: Task = { id: Date.now(), userId: user.id, text, completed: false };
    all.push(newTask);
    this.saveAllTasks(all);
    return newTask;
  }

  deleteTask(id: number): void {
    const all: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.saveAllTasks(all.filter(t => t.id !== id));
  }

  editTask(id: number, newText: string): void {
    const all: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const task = all.find(t => t.id === id);
    if (task) task.text = newText;
    this.saveAllTasks(all);
  }

  toggleTask(id: number): void {
    const all: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const task = all.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    this.saveAllTasks(all);
  }

  updateList(id: string, tasks: Task[]): void {
    const all: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
    const list = all.find(l => l.id === id);
    if (list) {
      list.tasks = tasks.map(t => ({ ...t }));
      this.saveAllLists(all);
    }
  }

  toggleListTask(listId: string, taskId: number): void {
    const all: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
    const list = all.find(l => l.id === listId);
    if (list) {
      const task = list.tasks.find(t => t.id === taskId);
      if (task) task.completed = !task.completed;
      this.saveAllLists(all);
    }
  }

  deleteList(id: string): void {
    const all: TaskList[] = JSON.parse(localStorage.getItem('taskLists') || '[]');
    this.saveAllLists(all.filter(l => l.id !== id));
  }
}
