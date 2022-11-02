import { Component, Input, OnInit } from '@angular/core';

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'outline-primary'
  | 'outline-secondary';

export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  text!: string;

  @Input()
  type: ButtonType = 'button';

  @Input() styleClass = '';

  @Input()
  variant: ButtonVariants = 'primary';

  @Input() disabled: boolean = false;

  variantsClasses = {
    primary: {
      'text-white': true,
      'focus:ring-primary': true,
      'bg-gradient-to-r': true,
      'from-primary': true,
      'to-secondary': true,
    },
    secondary: {
      'text-white': true,
      'bg-secondary': true,
      'focus:ring-secondary': true,
    },
    'outline-primary': {
      'text-primary': true,
      'bg-white': true,
      'focus:ring-primary': true,
      border: true,
      'border-primary': true,
    },
    'outline-secondary': {
      'text-secondary': true,
      'bg-white': true,
      'focus:ring-secondary': true,
      border: true,
      'border-secondary': true,
    },
  };

  constructor() {}

  ngOnInit(): void {}

  get variantClass(): any {
    return {
      ...this.variantsClasses[this.variant],
      'cursor-not-allowed': this.disabled,
      'bg-opacity-50': this.disabled,
    };
  }
}
