import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from './../../services/test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  public studentsDetails: any[] = [];
  public studentForm!: FormGroup;
  public courseData: string[] = [
    'BCA',
    'BCOM',
    'BBA',
    'BA',
    'BSC',
    'MCA',
    'MCOM',
    'MBA',
    'MA',
  ];
  public isLoading: boolean = false;
  private updateId!: number;
  public btnName: string = 'Submit';
  public title: string = 'Student Registation';

  constructor(private testService: TestService, private fb: FormBuilder) {
    this.formValidation();
  }

  private formValidation() {
    this.studentForm = this.fb.group({
      rno: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_id: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getStudentsDetails();
  }

  private getStudentsDetails() {
    this.testService.srtudentDetails().subscribe({
      next: (res: any) => {
        this.studentsDetails = res;
        console.log('res', res);
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }

  public onSubmit() {
    this.isLoading = true;
    if (this.studentForm.invalid) {
      this.isLoading = false;
      this.btnName = 'Submit';
      return;
    }
    const data = {
      ...this.studentForm.value,
    };
    if (this.btnName === 'Submit') {
      this.testService.sentStudentData(data).subscribe({
        next: (res: any) => {
          console.log('res', res);
          this.isLoading = false;
          this.btnName = 'Submit';
          this.studentForm.reset();
        },
        error: (err: any) => {
          console.log('err', err);
          this.isLoading = false;
          this.btnName = 'Submit';
          this.studentForm.reset();
        },
      });
    } else {
      this.testService.updateStudentData(data, this.updateId).subscribe({
        next: (res: any) => {
          console.log('res', res);
          this.isLoading = false;
          this.btnName = 'Submit';
          this.studentForm.reset();
        },
        error: (err: any) => {
          console.log('err', err);
          this.isLoading = false;
          this.btnName = 'Submit';
          this.studentForm.reset();
        },
      });
    }
    this.getStudentsDetails();
    this.title = 'Student Registration';
  }

  public onPatch(data: any) {
    console.log('data', data);
    this.updateId = data.rno;
    this.studentForm.patchValue(data);
    this.btnName = 'Update';
    this.title = 'Update Student Details';
  }

  public onDelete(rno: number) {
    this.testService.deleteStudentDetails(rno).subscribe({
      next: (res: any) => {
        console.log('res', res);
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
    this.getStudentsDetails();
  }
}
