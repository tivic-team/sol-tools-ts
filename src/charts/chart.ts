import Chart, { ChartTooltipOptions } from 'chart.js';
import { IChartOptions } from './chart-options';

/**
 * Interface que define o contrato para implementação de gráficos
 *
 * @method plot Método que realiza a plotagem do gráfico
 * @method buildTooltip Método que constrói a tooltip do gráfico
 */
export interface IChart {
  plot();
  buildTooltip(): ChartTooltipOptions;
  getOptions():IChartOptions;
  setOptions(options:IChartOptions):void;
}
