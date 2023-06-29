import { Directive, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appPractice]'
})
export class PracticeDirective implements OnInit {

  @HostBinding('class.fileover') fileOver!: boolean;
  @Output() fileDropped: any = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files as any);
    }
  }
}
