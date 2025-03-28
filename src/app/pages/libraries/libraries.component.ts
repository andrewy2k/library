import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AsyncPipe, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage, ViewportScroller } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter, finalize,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  tap
} from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ELibraryKeys, ILibrary, IObjectAddress, IWrapper, LibraryKeyTranslations } from '../../models/library';
import { IRequestParams } from '../../models/api';
import { HighlightPipe } from '../../pipe/highlight.pipe';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { EmptyComponent } from '../../components/empty/empty.component';

@Component({
  selector: 'app-libraries',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    ReactiveFormsModule,
    HighlightPipe,
    RouterLink,
    LoaderComponent,
    EmptyComponent
  ],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {

        if (config.width) {
          return `${config.src.split('.')[0]}${config.width ? '-' + config.width : ''}.jpg`;
        }
        return config.src;
      },
    },
  ],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrariesComponent implements OnInit, AfterViewChecked, OnDestroy {
  protected canLoadMore!: boolean;
  protected searchValue!: string;
  protected search: FormControl = new FormControl('');
  protected librariesParams!: IRequestParams;

  protected readonly loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  protected readonly libraries$: BehaviorSubject<ILibrary[] | null> = new BehaviorSubject<ILibrary[] | null>(null);
  protected readonly libraryKeyTranslations = LibraryKeyTranslations;
  protected readonly ELibraryKeys = ELibraryKeys;

  private shouldScroll!: boolean;
  private totalFound!: number;

  private readonly destroy: Subject<void> = new Subject();
  private readonly api: ApiService = inject(ApiService);
  private readonly viewportScroller: ViewportScroller = inject(ViewportScroller);

  public ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter((value) => value.length > 2 || value.length === 0),
      tap((value) => {
        this.searchValue = value;
        this.getLibraries(true)
      }),
      takeUntil(this.destroy)
    ).subscribe();
    this.getLibraries(true);
  }

  public ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.viewportScroller.scrollToAnchor('bottomAnchor');
      this.shouldScroll = false;
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  protected showMore(): void {
    if (this.canLoadMore) {
      this.librariesParams.$skip += this.librariesParams.$top;
      this.getLibraries();
    }
  }

  protected makeAddress(address: IObjectAddress[]): string {
    return address.map((v)=>v.Address).join(', ');
  }

  private getLibraries(force?: boolean): void {
    this.loading$.next(true);
    if (force) {
      this.initLibrariesParams(this.search.value);
      this.libraries$.next(null);
    }

    const count$: Observable<number> = force ? this.api.getLibrariesCount(this.librariesParams) : of(this.totalFound);

    forkJoin([
      count$,
      this.api.getLibraries(this.librariesParams)
        .pipe(
          map((result: IWrapper<ILibrary>[]) => result.map((v: IWrapper<ILibrary>) => v.Cells)),
        )
    ]).pipe(
      finalize(()=>this.loading$.next(false)),
      takeUntil(this.destroy)
    )
      .subscribe({
        next: ([count, result]: [number, ILibrary[]]) => {
          this.totalFound = count;

          const libraries: ILibrary[] = [...((force ? [] : this.libraries$.getValue()) || []), ...result];
          this.libraries$.next(libraries.length ? libraries : null);

          if (result.length < this.librariesParams.$top) {
            this.canLoadMore = false
          } else {
            this.canLoadMore = this.totalFound > libraries.length;
          }
          this.shouldScroll = true;
        },
        error: ((err) => console.error(err)),
      });
  }

  private initLibrariesParams(searchString: string): void {
    this.canLoadMore = false;
    this.totalFound = 0;
    this.librariesParams = {
      id: 526,
      $filter: searchString ? `substringof(${ELibraryKeys.FullName}, ${searchString}) eq true` : '',
      $inlinecount: 'allpages',
      $top: 10,
      $skip: 0,
      $orderby: ELibraryKeys.FullName,
    }
  }

}
