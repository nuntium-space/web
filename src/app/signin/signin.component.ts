import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent
{
  constructor(private api: ApiService)
  {}
}
