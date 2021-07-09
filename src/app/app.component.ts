import { Component, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public url: string;

  private onLangChange?: Subscription;

  constructor(
    public el: ElementRef,
    public translate: TranslateService,
    private router: Router
  ) {
    this.url = this.getMainContentUrl();

    router.events
      .pipe(filter((_) => _ instanceof NavigationEnd))
      .subscribe(() => {
        this.url = this.getMainContentUrl();
      });
  }

  private getMainContentUrl(): string {
    return `${this.router.url.split('#')[0]}#main-content`;
  }

  public ngOnInit(): void {
    this.updateLanguage();
    this.onLangChange = this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });
  }

  public ngOnDestroy(): void {
    if (this.onLangChange !== undefined) {
      this.onLangChange.unsubscribe();
    }
  }

  private updateLanguage(): void {
    const lang = document.createAttribute('lang');
    lang.value = this.translate.currentLang;
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(
      lang
    );
  }
}
