interface PostgresError extends Error {
  severity_local: string;
  severity: string;
  code: string;
  position: string;
  file: string;
  line: string;
  routine: string;

  detail?: string | undefined;
  hint?: string | undefined;
  internal_position?: string | undefined;
  internal_query?: string | undefined;
  where?: string | undefined;
  schema_name?: string | undefined;
  table_name?: string | undefined;
  column_name?: string | undefined;
  data?: string | undefined;
  type_name?: string | undefined;
  constraint_name?: string | undefined;

  /** Only set when debug is enabled */
  query: string;
  /** Only set when debug is enabled */
  parameters: any[];
}

export function isPostgresError(error: unknown): error is PostgresError {
  return error instanceof Error && "code" in error;
}
