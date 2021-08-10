import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  FILE_UPLOAD_ENDPOINT: string = environment.file_uplod_endpoint;
  constructor(private http: HttpClient) {}

  public upload(formData): Observable<any> {
    return this.http.post<any>(this.FILE_UPLOAD_ENDPOINT, formData);
  }
}
