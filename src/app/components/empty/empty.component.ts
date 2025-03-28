import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {
  @Input() public title!: string;
  @Input() public message!: string;
}
