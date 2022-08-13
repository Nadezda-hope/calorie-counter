import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IActivity } from '../activity.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public calcNumber!: number;

  public activityList: IActivity[] = [
    {
      value: '1',
      text: 'minimal activity'
    },
    {
      value: '2',
      text: 'low level of activity'
    },
    {
      value: '3',
      text: 'moderate activity level'
    },
    {
      value: '4',
      text: 'heavy or labor-intensive activity'
    },
    {
      value: '5',
      text: 'extreme level'
    },
  ]

  public calcForm = this.formBuilder.group({
    age: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    growth: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required)
  })

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public getActivity(): number {
    let activityCode: number = 0;

    switch (this.calcForm.controls['activity'].value) {
      case '1': activityCode = 1.2;
        break;

      case '2': activityCode = 1.375;
        break;

      case '3': activityCode = 1.55;
        break;

      case '4': activityCode = 1.7;
        break;

      case '5': activityCode = 1.9;
        break;
    }

    return activityCode;
  }

  public onSubmit(): void {
    if (this.calcForm.controls['sex'].value === 'female') {
      this.calcNumber = Math.floor((10 * this.calcForm.controls['weight'].value + 6.25 * this.calcForm.controls['growth'].value - 5 * this.calcForm.controls['age'].value - 161) * this.getActivity())
    } else {
      this.calcNumber = Math.floor((10 * this.calcForm.controls['weight'].value + 6.25 * this.calcForm.controls['growth'].value - 5 * this.calcForm.controls['age'].value + 5) * this.getActivity())
    }
  }

  public resetForm():void {
    this.calcForm.reset();
  }
}
