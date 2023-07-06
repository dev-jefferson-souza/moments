import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from 'src/app/services/comment/comment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IComment } from 'src/app/shared/models/comment';
import { IMoment } from 'src/app/shared/models/moment';
import { handleError } from 'src/app/utils/moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent {
  moment?: IMoment;
  baseApiUrl = environment.baseApiUrl;
  faTimes = faTimes;
  faEdit = faEdit;
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  commentForm!: FormGroup;
  ngOnInit() {
    this.momentService.getMoment(this.id).subscribe({
      next: (res) => (this.moment = res.data),
      error: (err) => handleError(err.status, this.messageService),
    });

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  async removeMoment() {
    this.momentService.removeMoment(this.id).subscribe({
      next: (res) => {
        this.messageService.add(res.message!);
        this.router.navigate(['/']);
      },
      error: (err) => handleError(err.status, this.messageService),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.valid) {
      const data: IComment = this.commentForm.value;
      data.momentId = Number(this.moment!.id);
      await this.commentService.createComment(data).subscribe({
        next: (res) => {
          this.moment!.comments!.push(res.data);
          this.messageService.add(res.message!);
          this.commentForm.reset(); //cleaning the inputs interface
          formDirective.resetForm(); // cleaning atributes
        },
        error: (err) => handleError(err.status, this.messageService),
      });
    }
  }
}
