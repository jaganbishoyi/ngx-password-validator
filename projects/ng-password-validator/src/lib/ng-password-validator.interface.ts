export interface NgPasswordValidatorOptions {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  'z-index'?: number;
  'animation-duration'?: number;
  'custom-class'?: string;
  shadow?: boolean;
  theme?: 'basic' | 'pro';
  type?: 'inline' | 'popup';
  offset?: number;
  width?: number;
  'max-width'?: number;
  position?: IPosition;
  rules?: IRules;
  heading?: string;
  successMessage?: string;
}
export interface IRules {
  password?: false | IPassword;
  'include-symbol'?: boolean;
  'include-number'?: boolean;
  'include-lowercase-characters'?: boolean;
  'include-uppercase-characters'?: boolean;
}

export interface IPosition {
  top: number;
  left: number;
}
export interface IPassword {
  type?: 'number' | 'range';
  length?: number;
  min?: number;
  max?: number;
}
export interface IElementPosition {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}
export interface IStatus {
  password: boolean;
  'include-symbol': boolean;
  'include-number': boolean;
  'include-lowercase-characters': boolean;
  'include-uppercase-characters': boolean;
}
export interface HostComponent {
  data: any;
  show: boolean;
  close: boolean;
  events: any;
}
