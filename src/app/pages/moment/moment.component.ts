import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/shared/models/moment';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.momentService.getMoment(this.id).subscribe({
      next: (res) => (this.moment = res.data),
      error: (err) => this.handleError(err.status),
    });
  }

  handleError(status: number) {
    const request_errors = [
      { status: 404, message: 'The moment was not found!' },
      { status: 500, message: 'An internal error has occurred' },
    ];

    const error = request_errors.find((error) => error.status === status);
    error
      ? this.messageService.add(error.message)
      : this.messageService.add('An error occurred during the request.');
  }

  async removeMoment() {
    this.momentService.removeMoment(this.id).subscribe({
      next: (res) => {
        this.messageService.add(res.message!);
        this.router.navigate(['/']);
      },
      error: (err) => this.handleError(err.status),
    });
  }
}
