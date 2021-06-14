import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Editor } from '@tiptap/core';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

@Component({
  selector: 'shared-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges
{
  @Input()
  public content?: any;

  @Input()
  public isReadOnly = false;

  @Output()
  public contentChange = new EventEmitter<any>();

  public editor?: Editor;

  public ngOnInit()
  {
    this.editor = new Editor({
      element: document.querySelector("#editor") ?? undefined,
      editable: !this.isReadOnly,
      content: this.content,
      extensions: [
        StarterKit,
        Underline,
        Typography,
        TextAlign,
        Superscript,
        Subscript,
        Link,
        BubbleMenu.configure({
          element: document.getElementById("bubble-menu"),
        }),
      ],
      onUpdate: () =>
      {
        this.contentChange.emit(this.editor?.getJSON());
      },
    });
  }

  public ngOnChanges()
  {
    this.editor?.setEditable(!this.isReadOnly);
  }

  public do(action: string, e?: Event)
  {
    switch (action)
    {
      case "undo": this.editor?.chain().focus().undo().run(); break;
      case "redo": this.editor?.chain().focus().redo().run(); break;
  
      case "bold": this.editor?.chain().focus().toggleBold().run(); break;
      case "italic": this.editor?.chain().focus().toggleItalic().run(); break;
      case "strike": this.editor?.chain().focus().toggleStrike().run(); break;
      case "underline": this.editor?.chain().focus().toggleUnderline().run(); break;

      case "subscript": this.editor?.chain().focus().toggleSubscript().run(); break;
      case "superscript": this.editor?.chain().focus().toggleSuperscript().run(); break;

      case "style":
      {
        const selectElement = e?.target as HTMLSelectElement;
        const selectedOption = selectElement.selectedOptions[0];

        selectedOption.value === "p"
          ? this.editor?.chain().focus().setParagraph().run()
          : this.editor?.chain().focus().toggleHeading({ level: parseInt(selectedOption.value.replace("h", "")) as any }).run();

        break;
      }

      case "bulletList": this.editor?.chain().focus().toggleBulletList().run(); break;
      case "orderedList": this.editor?.chain().focus().toggleOrderedList().run(); break;

      case "link":
      {
        const url = window.prompt("URL");

        this.editor?.chain().focus().toggleLink({ href: url ?? "" }).run();

        break;
      }

      case "codeBlock": this.editor?.chain().focus().toggleCodeBlock().run(); break;
      case "blockquote": this.editor?.chain().focus().toggleBlockquote().run(); break;

      case "horizontalRule": this.editor?.chain().focus().setHorizontalRule().run(); break;
      case "hardBreak": this.editor?.chain().focus().setHardBreak().run(); break;

      case "clearMarks": this.editor?.chain().focus().unsetAllMarks().run(); break;

      case "alignLeft": this.editor?.chain().focus().setTextAlign("left").run(); break;
      case "alignCenter": this.editor?.chain().focus().setTextAlign("center").run(); break;
      case "alignRight": this.editor?.chain().focus().setTextAlign("right").run(); break;
      case "alignJustify": this.editor?.chain().focus().setTextAlign("justify").run(); break;
    }
  }
}
