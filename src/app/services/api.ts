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
}
