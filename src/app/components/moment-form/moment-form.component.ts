import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMoment } from 'src/app/shared/models/moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent {
  @Output() onSubmit = new EventEmitter<IMoment>();
  @Input() button_text!: string;
  momentForm!: FormGroup;
  selectedImage: File | null = null;

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  get image() {
    return this.momentForm.get('image')!;
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  submit() {
    if (this.momentForm.valid) {
      const formData: IMoment = {
        ...this.momentForm.value,
        image: this.selectedImage,
      };
      this.onSubmit.emit(formData);
    }
  }
}
