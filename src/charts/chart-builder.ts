import { FormGroup } from "@angular/forms";
import { BarChart } from "./bar-chart";
import { PizzaChart } from "./pizza-chart";
import { ManagerModalChart } from "./manager-modal-chart";
import { IChartData } from "./chart-data";
import Chart from 'chart.js';
import { tipoGrafico } from "./tipo-grafico.enum";
import { IChartOptions } from "./chart-options";
export class ChartBuilder{
    private _chartOptions:IChartOptions;
    private _canvasId:string;
    private _tpGrafico:number;
    private _items:any[];
    private _formGroup:FormGroup;

    private _dataMensal:IChartData;
    private _dataPorHora:IChartData;

    private _managerModalChart: ManagerModalChart = new ManagerModalChart();

    tipo(tpGrafico:number):ChartBuilder{
        this._tpGrafico = tpGrafico;
        return this;
    }

    canvasId(canvasId:string):ChartBuilder{
        this._canvasId = canvasId;
        return this;
    }

    formGroupFilters(formGroup:FormGroup):ChartBuilder{
        this._formGroup = formGroup;
        return this;
    }

    registers(registers:any[]):ChartBuilder{
        this._items = registers;
        return this;
    }

    chartOptions(chartOptions:IChartOptions):ChartBuilder{
        this._chartOptions = chartOptions;
        return this;
    }

    build():Chart{
        if(this._formGroup && this._formGroup.value.campoAnalisado.type == 'date')
            this._dataMensal = this._managerModalChart.mensal(this._formGroup, this._items);
        if(this._formGroup && this._formGroup.value.campoAnalisado.type == 'hour')
            this._dataPorHora = this._managerModalChart.porHora(this._formGroup, this._items);
        switch(this._tpGrafico){
            case tipoGrafico.BARRAS:
                return new BarChart(this._chartOptions || {
                    canvasId: this._canvasId || 'grafico',
                    data: this._dataMensal || this._dataPorHora || this._managerModalChart.generateDataChart(this._formGroup.value, this._items)
                }).plot();
            case tipoGrafico.PIZZA:
                return new PizzaChart(this._chartOptions || {
                    canvasId: this._canvasId || 'grafico',
                    data: this._dataMensal || this._dataPorHora|| this._managerModalChart.generateDataChart(this._formGroup.value, this._items)
                }).plot();
        }
    }
}
