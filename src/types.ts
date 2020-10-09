export type DPTelemetry = boolean | string | number | null;

export type DPRecord = Record<string, DPTelemetry> & { $id: string, $ts?: number };

export type DPKpiResult = {
  error?: unknown,
  data: unknown,
  meta?: unknown,
};
