import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Theme } from '../../../../types/Theme';

@Component({
  selector: 'shared-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss'],
})
export class PopupMenuComponent implements OnInit {
  @Input()
  public theme: Theme = 'dark';

  public isMenuVisible = false;

  @ViewChild('container')
  private container?: ElementRef<HTMLDivElement>;

  @ViewChild('toggle')
  private toggleMenuButton?: ElementRef<HTMLButtonElement>;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public ngOnInit() {
    this.document.addEventListener('click', (e) => {
      if (!this.isMenuVisible) {
        return;
      }

      const target = e.target as HTMLElement;

      // Ignore clicks inside the toggle button
      if (this.toggleMenuButton?.nativeElement.contains(target)) {
        return;
      }

      // Hide if the click was outside the menu or if it was on a button or link
      if (
        !this.container?.nativeElement.contains(target) ||
        ['A', 'BUTTON'].includes(target.tagName)
      ) {
        this.isMenuVisible = false;
      }
    });
  }
}
