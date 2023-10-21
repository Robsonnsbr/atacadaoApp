import {EnumWorkShiftType } from './Enums';

export type Activated = {
  id?: string;
  collector?: { num: string; sn: string; status: boolean };
   employee?: { name: string; mat: string; workShift: EnumWorkShiftType; status: boolean };
};
