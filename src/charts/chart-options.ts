import { ChartLegendOptions, ChartPluginsOptions } from 'chart.js';
import { IChartData } from './chart-data';

/**
 * Interface que encapsula opções para plotagem de gráficos
 *
 * @param canvasId Id do elemento canvas em que o gráfico será plotado
 * @param data Dados do gráfico
 * @param colorscheme Esquema de cores. As opções disponíveis encontram-se em https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
 * @param legend Opções de exibição da legenda. A documentação completa encontra-se em https://www.chartjs.org/docs/2.9.4/configuration/legend.html
 * @param title Título do gráfico
 * @param plugins Configuração de plugins a serem adicionados ao gráfico
 * @param stacked Determina o empilhamento do gráfico de barras
 */
export interface IChartOptions {
  canvasId: string;
  data: IChartData;
  colorscheme?: string;
  legend?: ChartLegendOptions;
  title?: string;
  plugins?: ChartPluginsOptions;
  stacked?: boolean;
}
