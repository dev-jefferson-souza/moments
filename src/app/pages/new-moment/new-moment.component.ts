import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/shared/models/moment';
import { handleError } from 'src/app/utils/moment';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  button_text: string = 'Share';

  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router
  ) {}

  async createHandler(moment: IMoment) {
    alert('');
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    formData.append('image', moment.image);
    this.momentService.createMoment(formData).subscribe({
      next: () => {
        this.messageService.add('A moment has been successfully added');
        this.router.navigate(['/']);
      },
      error: (err) => handleError(err.status, this.messageService),
    });
  }
}
