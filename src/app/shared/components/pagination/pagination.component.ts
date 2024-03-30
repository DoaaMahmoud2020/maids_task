import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Output() paginationOptions = new EventEmitter();
  @Input() length?: number;
  @Input() pageIndex = 0;
  pageSize = 0;
  pageSizeOptions = [6, 25, 50];
  pageEvent?: PageEvent;

  constructor() {}

  ngOnInit(): void {}

  handlePageEvent(event: PageEvent) {
    debugger;
    let { pageIndex, pageSize, length } = event;
    this.paginationOptions.emit({
      currentPage: pageIndex + 1,
      pageSize,
      length,
    });
    this.pageEvent = event;
    this.pageSize = pageSize;
    this.length = length;
    this.pageIndex = pageIndex;
  }
}
