// Enums.ts
export const EnumWorkShift = {
    MANHA: "MANHÃ" as const,
    TARDE: "TARDE" as const,
    NOITE: "NOITE" as const,
    HIBRIDO: "HÍBRIDO" as const,
  };
  
  export type EnumWorkShiftType = typeof EnumWorkShift[keyof typeof EnumWorkShift];
  