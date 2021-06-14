import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from '@tiptap/core';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { ApiService, IAuthor } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'write-new-article',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class WriteNewArticleComponent implements OnInit
{
  private author?: IAuthor;

  public form = new FormGroup({
    title: new FormControl(),
  });

  public editor?: Editor;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.listAuthorsForUser(auth.user.id).then(response =>
    {
      if (response.data)
      {
        this.author = response.data.find(author => author.publisher.id === route.snapshot.params.id);
      }
    });
  }

  public ngOnInit()
  {
    this.editor = new Editor({
      element: document.querySelector("#editor") ?? undefined,
      extensions: [
        StarterKit,
        Underline,
        Typography,
        TextAlign,
      ],
      content: "",
    });
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

  public async onSubmit(end: () => void)
  {
    if (!this.author)
    {
      return;
    }

    const response = await this.api.createArticle(this.author.id, {
      title: this.form.get("title")?.value ?? "",
      content: JSON.parse(JSON.stringify(this.editor?.getJSON())),
    });

    end();

    this.form.get("title")?.setErrors({
      errors: response.errors?.filter(e => e.field === "title")
    });

    this.form.get("content")?.setErrors({
      errors: response.errors?.filter(e => e.field === "content")
    });

    if (response.data)
    {
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
