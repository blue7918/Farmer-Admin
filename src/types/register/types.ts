import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { UseFormRegisterReturn } from 'react-hook-form';

// form types
export interface IAuthForm {
  email: string;
  selectedEmail: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  postCode: string;
  basicAddress: string;
  detailAddress: string;
  nickname: string;
  checked: boolean;
}

export interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
  // 추가적인 필드들을 필요에 따라 정의
}

export type FieldName =
  | 'email'
  | 'selectedEmail'
  | 'password'
  | 'passwordConfirm'
  | 'name'
  | 'phone'
  | 'postCode'
  | 'basicAddress'
  | 'detailAddress'
  | 'nickname'
  | 'checked';

export type Validate = (
  value: any,
) => boolean | string | Promise<boolean | string>;

// input fields types
export interface InputProps {
  label: string;
  inputProps: UseFormRegisterReturn;
  error: string | null;
  placeholder: string;
  subText?: string | ReactJSXElement;
  type?: string;
}

// FormButton component props
export interface ButtonProps {
  label?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

// SnsCircle
export interface CircleProps {
  color?: string;
  marginRight?: number;
  marginLeft?: number;
}
