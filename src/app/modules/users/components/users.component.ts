import {
  Component,
  DestroyRef,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpService } from 'src/app/core/services/http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/internal/operators/finalize';
import { IUser } from '../interfaces/user.interface';
import { NgxLoadingModule } from 'ngx-loading';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { IPayLoadResponse } from '../interfaces/payload-response.interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { NotFoundDataComponent } from 'src/app/shared/components/not-found-data/not-found-data.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    NgOptimizedImage,
    NgxLoadingModule,
    PaginationComponent,
    RouterModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    NgIf,
    NotFoundDataComponent,
  ],
  providers: [HttpService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  private _http: HttpService = inject(HttpService);
  destroyRef: DestroyRef = inject(DestroyRef);

  isLoading!: boolean;
  userList: IUser[] = [];
  payLoad!: IPayLoadResponse;
  pageNumber: number = 1;
  @Output() paginationEmitter = new EventEmitter();
  pageSizeOptions = [6, 25, 50];
  private searchTerms = new Subject<string>();
  ngOnInit(): void {
    this.getAllUsers();
    this.getAllUsersWithFilter();
  }

  getAllUsers() {
    this.isLoading = true;
    this._http
      .getAll({ PageNumber: this.pageNumber }, 'users')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: IPayLoadResponse) => {
          this.onSuccess(response);
        },
        error: (error: Error) => {},
      });
  }
  getAllUsersWithFilter() {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.searchItems(term))
      )
      .subscribe((users: IUser[]) => {
        this.userList = users;
      });
  }
  onSuccess(response: IPayLoadResponse) {
    this.userList = response.data;
    this.payLoad = response;
  }
  onPageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getAllUsers();
  }
  onSearch(value: string) {
    if (value != '') {
      this.searchTerms.next(value);
    } else this.getAllUsers();
  }
  searchItems(term: string): Observable<IUser[]> {
    const filteredItems = this.userList.filter((item) => {
      return item.id == +term || item.first_name?.includes(term);
    });
    return of(filteredItems);
  }
  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
