import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss'],
})
export class MovieRatingComponent implements OnChanges {
  cropWidth = 80;
  @Input() rating?= 0;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(): void {
    if (this.rating) this.cropWidth = (this.rating * this.cropWidth) / 5;
  }

  onClick(): void {
    this.ratingClicked.emit(`Rating: ${this.rating}`);
  }
}
