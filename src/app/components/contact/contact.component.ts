import { Component, OnInit } from '@angular/core';
import { MessageService, MESSAGE_STATUS } from 'src/app/services/message.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private titleService: Title
    ) {}

  name: FormControl = new FormControl();
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  message: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  messageForm!: FormGroup;
  ngOnInit(): void {
    
    this.titleService.setTitle('Contact - notcomfy');
    this.messageService.messageStatus  = MESSAGE_STATUS.NOT_SENT;

    this.messageForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message
    });

    // this.messageForm.valueChanges.subscribe();
  }


  submitMessage() {
    if (this.messageForm.valid) {
      this.messageService.submitMessage({
        senderName: this.name.value,
        senderEmail: this.email.value,
        message: this.message.value
      });
    }
  }
}
