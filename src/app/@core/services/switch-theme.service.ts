import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SwitchThemeService {

  private readonly _localStorageKey: string = 'dark_mode';
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public get isDarkMode(): boolean {
    return !!localStorage.getItem(this._localStorageKey);
  }

  public initTheme(): void {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }

  public switch(toDarkMode: boolean): void {
    if (toDarkMode && !this.isDarkMode) {
      localStorage.setItem(this._localStorageKey, 'yes');
      this.renderer.removeClass(document.body, 'dark-mode');
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      localStorage.removeItem(this._localStorageKey)
    }
  }

}
