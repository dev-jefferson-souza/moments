import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/shared/models/comment';
import { IResponse } from 'src/app/shared/models/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments/`;

  constructor(private http: HttpClient) {}

  createComment(comment: IComment): Observable<IResponse<IComment>> {
    const url = `${this.apiUrl}${comment.momentId}/comments`;
    return this.http.post<IResponse<IComment>>(url, comment);
  }
}
