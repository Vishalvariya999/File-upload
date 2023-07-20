import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { retry, Subject, takeUntil } from 'rxjs';
import { UploadImageService } from './services/upload-image.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'practice123';

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  @Input() chart2!: ApexChart;
  @Input() series!: ApexAxisChartSeries;
  @Input() xaxis!: ApexXAxis;
  @Input() title1!: ApexTitleSubtitle;

  public files: any = [];
  public frmImageUpload!: FormGroup;
  public uploadedFile!: File;
  public uploadedMedia: any;
  public uploadImages: any;

  constructor(
    private uploadImageService: UploadImageService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.frmImageUpload = this.fb.group({
      // name: ['Test'],
      // email: ['test@yopmail.com'],
      // password: ['1243568234'],
      // role: ['student'],
      name: [''],
      email: [''],
      password: [''],
      role: [''],
      profileImage: [''],
    });
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'My First Angular Chart',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
    };
  }

  onFileDropped(event: any) {
    console.log('event :>> ', event);
    // this.prepareFilesList(event);
    this.frmImageUpload.patchValue({
      profileImage: event[0],
    });
    this.frmImageUpload.controls['profileImage'].updateValueAndValidity();
    console.log('this.frmImageUpload :>> ', this.frmImageUpload);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.frmImageUpload.controls['profileImage'].patchValue(
      event.target.files[0]
    );
    this.frmImageUpload.updateValueAndValidity();
    this.uploadedFile = event?.target?.files[0];
    console.log('event.target.files :>> ', event.target.files);
    if (event.target.files.length > 0) {
      const profile = event.target.files[0];
      this.frmImageUpload.get('profileImage')?.setValue(profile);
    }
  }

  onUploadImg(): any {
    // const data = {
    //   name: 'Test',
    //   email: 'test@yopmail.com',
    //   password: '12345678',
    //   role: 'Student',
    //   // profileImage: this.frmImageUpload.value.profileImage
    // }
    // const formData = new FormData();
    // Object.entries(this.frmImageUpload?.value).forEach((res: any) => {
    //   formData.append(res[0], res[1])
    // })
    // formData.append("profileImage", this?.uploadedFile)
    // this.uploadImageService.uploadImage(formData).subscribe((res: any) => {
    //   console.log('res :>> ', res);
    // })
    const random = Math.random() * 100;
    console.log('random :>> ', random);
    const formData = new FormData();
    formData.append('name', 'Test');
    formData.append('email', `test${random}@yopmail.com`);
    formData.append('password', '123456789');
    formData.append('role', 'Teacher');
    formData.append(
      'profileImage',
      this.frmImageUpload.get('profileImage')?.value
    );

    this.uploadImageService.uploadImage(formData).subscribe((res: any) => {
      console.log('res--main :>> ', res);
      this.uploadedMedia = res;

      // if (res && res?.status === 200) {
      //   console.log('res--success :>> ', res.body);
      //   this.uploadImages = res
      //   console.log('this.uploadImages :>> ', this.uploadImages);
      //   this.frmImageUpload.reset();
      // }
      this.toastrService.error('Error find successfully', 'Error');
      // console.log('res-success :>> ', res);
      // console.log('this.uploadedMedia :>> ', this.uploadedMedia);
      // this.toastrService.success(res.message, 'Success');
    });
  }

  // fileBrowserHandle(event: any) {
  // console.log('data-files :>> ', data);
  // this.prepareFilesList(event?.target?.files);
  // this.prepareFilesList(event?.target?.files);
  // console.log('event :>> ', event?.target?.files);
  // }

  onDeleteFile(index: any) {
    console.log('index :>> ', index);
    this.files.splice(index, 1);
  }

  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.files.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.files[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.files[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  // prepareFilesList(files: Array<any>) {
  //   for (const item of files) {
  //     this.files.push(item);
  //   }
  // this.uploadFilesSimulator(0);
  // }
}
