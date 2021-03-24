import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class TranslationLoader implements TranslateLoader
{
    constructor(private http: HttpClient)
    {}

    getTranslation(lang: string): Observable<any>
    {
        return this.http.get(`${environment.api.endpoint}/translations/${lang}`);
    }
}