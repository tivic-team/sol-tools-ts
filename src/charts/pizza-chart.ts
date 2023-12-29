import Chart, { ChartTooltipOptions } from 'chart.js';
import { IChart } from './chart';
import { IChartData } from './chart-data';
import { IChartOptions } from './chart-options';

export class PizzaChart implements IChart {
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
      type: 'pie',
      data: this.options.data,
      options: {
        legend: {
          display: true,
          align: 'center',
          position: 'bottom',
          ...this.options.legend,
        },
        tooltips: this.buildTooltip(),
        plugins: {
          colorschemes: {
            scheme: 'brewer.Spectral3'
          },
          ...this.options.plugins,
        },
        title: {
          display: !!this.options.title,
          text: this.options.title,
        },
      },
    });
  }

  buildTooltip(): ChartTooltipOptions {
    return {
      callbacks: {
        title: (item, data: IChartData) => {
          return data.labels[item[0].index];
        },
        label: (item, data: IChartData) => {
          const itemValue = data.datasets[0].data[item.index];

          if (data.percentage) {
            return `${(itemValue * 100).toFixed(1)}%`;
          } else {
            const totalValue = data.datasets[0].data.reduce((prev, curr) => prev + curr, 0);
            const itemPercentage = ((itemValue / totalValue) * 100).toFixed(1);
            return `${itemValue} (${itemPercentage}%)`;
          }
        },
      },
    };
  }
}
