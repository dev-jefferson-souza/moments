import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/shared/models/moment';
import { handleError } from 'src/app/utils/moment';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent {
  moment!: IMoment;
  button_text: string = 'Update';
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.momentService.getMoment(this.id).subscribe({
      next: (res) => (this.moment = res.data),
      error: (err) => handleError(err.status, this.messageService),
    });
  }

  editHandler(momentData: IMoment) {
    const formData = new FormData();
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);
    momentData.image && formData.append('image', momentData.image);

    this.momentService.updateMoment(this.id, formData).subscribe({
      next: (res) => {
        this.messageService.add(res.message!);
        this.router.navigate(['/']);
      },
      error: (err) => handleError(err.status, this.messageService),
    });
  }
}
