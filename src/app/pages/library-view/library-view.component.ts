import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IRequestParams } from '../../models/api';
import { BehaviorSubject, finalize, map, Subject, takeUntil } from 'rxjs';
import { ELibraryKeys, ILibrary, IWrapper, LibraryKeyTranslations } from '../../models/library';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { EmptyComponent } from '../../components/empty/empty.component';
import { DisplayValuePipe } from '../../pipe/display-value.pipe';

@Component({
  selector: 'app-library-view',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    LoaderComponent,
    EmptyComponent,
    DisplayValuePipe
  ],
  templateUrl: './library-view.component.html',
  styleUrl: './library-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryViewComponent implements OnInit, OnDestroy {
  protected libraryParams!: IRequestParams;
  protected id!: string;

  protected readonly loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  protected readonly library$: BehaviorSubject<ILibrary | null> = new BehaviorSubject<ILibrary | null>(null);
  protected readonly libraryKeyTranslations = LibraryKeyTranslations;
  protected readonly libraryKeysArray: (keyof ILibrary)[] = Object.keys(ELibraryKeys) as (keyof ILibrary)[];

  private readonly api: ApiService = inject(ApiService);
  private readonly destroy: Subject<void> = new Subject();
  private readonly router: ActivatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    if (this.id) {
      this.initLibraryParams(this.router.snapshot.params['id']);
      this.getLibrary();
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initLibraryParams(globalId: string): void {
    this.libraryParams = {
      id: 526,
      $filter: globalId ? `${ELibraryKeys.global_id} eg ${globalId}` : '',
      $inlinecount: 'allpages',
      $top: 1,
      $skip: 0,
      $orderby: ELibraryKeys.FullName,
    }
  }

  private getLibrary(): void {
    this.loading$.next(true)
    this.api.getLibraries(this.libraryParams)
      .pipe(
        map((result: IWrapper<ILibrary>[]) =>{
          return result[0].Cells || null;
        }),
        finalize(()=>this.loading$.next(false)),
        takeUntil(this.destroy),
      ).subscribe({
      next:(library: ILibrary)=> this.library$.next(library),
      error: ((err) => console.error(err)),
    });
  }
}
