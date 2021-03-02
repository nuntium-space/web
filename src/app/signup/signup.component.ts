import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent
{
  constructor(private api: ApiService)
  {}
}
