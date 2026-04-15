import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root',})
export class Theme {
  isDarkTheme = false;

  init(): void {
    const saved = localStorage.getItem('theme');
    this.isDarkTheme = saved !== 'light';
    this.apply();
  }
  
  toggle(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.apply();
  }

  private apply(): void {
    document.body.setAttribute('data-theme', this.isDarkTheme ? '' : 'light');
  }
}
