import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MomentService } from 'src/app/services/moment/moment.service';
import { IMoment } from 'src/app/shared/models/moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faSearch = faSearch;

  allMoments: IMoment[] = [];
  moments: IMoment[] = [];
  baseApiUrl = environment.baseApiUrl;

  constructor(private momentService: MomentService) {}
  ngOnInit(): void {
    this.momentService.getMoments().subscribe((item) => {
      const data = item.data;
      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'en-US'
        );
      });

      this.allMoments = data;
      this.moments = data;
    });
  }
}
