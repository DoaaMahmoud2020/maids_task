import { Component, DestroyRef, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/internal/operators/finalize';
import { NgxLoadingModule } from 'ngx-loading';
import { IPayLoad } from '../../interfaces/payload.interface';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    NgxLoadingModule,
  ],
  providers: [HttpService],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  private _http: HttpService = inject(HttpService);
  destroyRef: DestroyRef = inject(DestroyRef);

  @Input() id!: string;
  isLoading!: boolean;
  user!: IPayLoad;
  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails() {
    this.isLoading = true;
    this._http
      .getItemById(this.id, 'users')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response: IPayLoad) => {
          this.onSuccess(response);
        },
        error: (error: Error) => {},
      });
  }
  onSuccess(response: IPayLoad) {
    this.user = response;
  }
}
