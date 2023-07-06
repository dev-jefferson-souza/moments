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
  @Input() momentData: IMoment | null = null;
  momentForm!: FormGroup;
  selectedImage: File | null = null;

  handleImageRequired() {
    return this.momentData ? null : [Validators.required];
  }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData?.id ?? ''),
      title: new FormControl(this.momentData?.title ?? '', [
        Validators.required,
      ]),
      description: new FormControl(this.momentData?.description ?? '', [
        Validators.required,
      ]),
      image: new FormControl('', this.handleImageRequired()),
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
