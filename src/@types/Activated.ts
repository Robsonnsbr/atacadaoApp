import {EnumWorkShiftType } from './Enums';

export type Activated = {
  id?: string;
  collector?: {   id?: string;
    numero: number;
    status?: boolean
    sn?: string};
   employee?: {     id?: string;
    name?: string;
    mat?: string;
    status?: boolean
    confirmMat?: EnumWorkShiftType;
    workShift?: string};
};
