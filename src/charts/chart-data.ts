/**
 * Interface que encapsula os dados de um gráfico
 *
 * @param labels Etiquetas do gráfico
 * @param datasets Dados do gráfico
 * @param percentage Determina se os dados do gráfico foram fornecidos em valores percentuais
 */
export interface IChartData {
  labels: string[];
  datasets: { label?: string; data: number[], backgroundColor?: string, borderColor?:string, borderWidth?: number, fill?: true, type?:string }[];
  percentage?: boolean;
}
