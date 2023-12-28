import Chart, { ChartTooltipOptions } from 'chart.js';
import { IChart } from './chart';
import { IChartData } from './chart-data';
import { IChartOptions } from './chart-options';

export class BarChart implements IChart {
  private chart:Chart;
  private options: IChartOptions;

  constructor(options?: IChartOptions) {
    this.options = options;
  }

  getOptions():IChartOptions{
    return this.options;
  }

  setOptions(options:IChartOptions){
    this.options = options;
  }

  plot() {
    return new Chart(<HTMLCanvasElement>document.getElementById(this.options.canvasId), {
      type: 'bar',
      data: this.options.data,
      options: {
        legend: { display: !!this.options.legend, align: 'center', position: 'bottom', ...this.options.legend },
        tooltips: this.buildTooltip(),
        plugins: {
          colorschemes: (this.options.colorscheme && { scheme: this.options.colorscheme, override: true }) || {scheme: 'brewer.Paired12'},
          ...this.options.plugins,
        },
        title: {
          display: !!this.options.title,
          text: this.options.title,
        },
        scales: {
          yAxes: [
            {
              stacked: !!this.options.stacked,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [{ stacked: !!this.options.stacked }],
        },
      },
    });
  }

  buildTooltip(): ChartTooltipOptions {
    return {
      callbacks: {
        title: () => {
          return '';
        },
        label: (item, data: IChartData) => {
          const totalValue = data.datasets.reduce((prev, curr) => prev + curr.data[item.index], 0);
          const itemPercentage = ((Number(item.value) / totalValue) * 100).toFixed(1);
          return `${data.datasets[item.datasetIndex].label || 'Total'}: ${item.value} (${itemPercentage}%)`;
        },
      },
    };
  }
}
