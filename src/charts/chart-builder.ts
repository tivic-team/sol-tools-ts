import { FormGroup } from "@angular/forms";
import { BarChart } from "./bar-chart";
import { PizzaChart } from "./pizza-chart";
import { ManagerModalChart } from "./manager-modal-chart";
import { IChartData } from "./chart-data";
import Chart from 'chart.js';
import { MesLabels } from "./mes.enum";
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

    private _mensal():ChartBuilder{
        let campoData:string = this._formGroup.value.campoAnalisado.dataField;
        let map:Map<string, number> = new Map();
        for(let item of this._items){
            let date:Date = new Date(item[campoData]);
            let mesAno = `${MesLabels.get(date.getMonth())}/${date.getFullYear()}`;
            if(map.has(mesAno))
                map.set(mesAno, map.get(mesAno) + 1);
            else
                map.set(mesAno, 1);
        }
        this._dataMensal = this._createData(map);
        return this;
    }

    private _porHora():ChartBuilder{
        let campoHora:string = this._formGroup.value.campoAnalisado.dataField;
        let map:Map<string, number> = new Map();
        for(let item of this._items){
            let date:Date = new Date(item[campoHora]);
            let hora = `${date.getHours()}:00`;
            if(map.has(hora))
                map.set(hora, map.get(hora) + 1);
            else
                map.set(hora, 1);
        }

        let mapOrdenado:Map<any, number> = new Map();
        while(map.size > 0){
            let maiorKey:string = null;
            for(let key of map.keys()){
                if(maiorKey == null || new Number(key.split(':')[0]) > new Number(maiorKey.split(':')[0])){
                    maiorKey = key;
                }
            }
            mapOrdenado.set(maiorKey, map.get(maiorKey));
            map.delete(maiorKey);
        }
        map = mapOrdenado;
        
        this._dataPorHora = this._createData(map);
        return this;
    }

    private _createData(map:Map<string, number>):IChartData{
        let labels:any[] = [];
        let dataSet:any[] = [];
        for(let key of map.keys()){
            labels.push(key);
            dataSet.push(map.get(key));
        }

        return {
            labels: labels,
            datasets: [{ data: dataSet }],
        };
    }

    build():Chart{
        if(this._formGroup && this._formGroup.value.campoAnalisado.type == 'date')
            this._mensal();
        if(this._formGroup && this._formGroup.value.campoAnalisado.type == 'hour')
            this._porHora();
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
