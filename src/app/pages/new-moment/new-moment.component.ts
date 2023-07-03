import { Component } from '@angular/core';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/shared/models/moment';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  button_text: string = 'Share';

  constructor(private momentService: MomentService) {}

  async createHandler(moment: IMoment) {
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);
    formData.append('image', moment.image);
    this.momentService.createMoment(formData).subscribe();
  }
}
