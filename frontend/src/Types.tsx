import React from 'react'

export interface PopoverProps {
  open: boolean,
  anchorEl: any
  onClose: (onClose: boolean) => void,
}

export interface HandlerClose {
  handlerClose: (handlerClose: boolean) => void
}

export interface RegisterData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordRepeat: string
}

export interface ResetPasswordData {
  password: string,
  passwordRepeat: string
}

export interface LoginData {
  email: string,
  password: string
}

export interface ResetToken {
  token: string
}

export interface LoginRegisterUser {
  successMsg?: string | null,
  errorMsg?: string | null
}

export interface ForgotPassword {
  email: string
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}


