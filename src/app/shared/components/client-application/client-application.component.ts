import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IClient } from '../../../core/interfaces/client/client';


@Component({
  selector: 'app-client-application',
  templateUrl: './client-application.component.html',
  styleUrls: ['./client-application.component.css']
})
export class ClientApplicationComponent implements OnInit, OnChanges {

  @Input() data: IClient;

  public clientForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change.data && this.data) {
      this.initForm(this.data);
    }
  }

  initForm(client?: IClient): void {
    this.clientForm = this.formBuilder.group({
      id: [client ? client.id : ''],
      name: [client ? client.name : '', Validators.required],
      lastname: [client ? client.lastname : '', Validators.required],
      identification: [client ? client.identification : '', Validators.required],
      email: [client ? client.email : '', [
        Validators.required,
        Validators.email,
      ]]
    });
  }
}
