import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Theme } from '../../types/Theme';

@Component({
  selector: 'shared-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss']
})
export class PopupMenuComponent implements OnInit
{
  @Input()
  public theme: Theme = "dark";

  public isMenuVisible = false;

  @ViewChild("toggle")
  private toggleMenuButton?: ElementRef<HTMLButtonElement>;

  @ViewChild("content")
  private content?: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document)
  {}

  public ngOnInit()
  {
    this.document.addEventListener("click", e =>
    {
      if (!this.isMenuVisible)
      {
        return;
      }

      const target = e.target as HTMLElement;

      if
      (
        /**
         * Do not hide the menu if:
         * - The user clicked on the toggle button
         * - The user clicked the content's container
         */
        !this.toggleMenuButton?.nativeElement.contains(target)
        && !this.content?.nativeElement.isSameNode(target)
      )
      {
        this.isMenuVisible = false;
      }
    });
  }
}
