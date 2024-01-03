import { FormGroup } from "@angular/forms";
import { FilterSearch } from "../reporter/filter-search";
import { IChartData } from "./chart-data";
import { MesLabels } from "./mes.enum";

export class ManagerModalChart{

    private _COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba',
        '#ff0000',
        '#bcbcbc',
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba',
        '#ff0000',
        '#bcbcbc',
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba',
        '#ff0000',
        '#bcbcbc',
    ];

    generateFieldFilters(modal:{listSearch:FilterSearch[], values:any}):void{
        let fieldFilters = "";
        let listFilterSearch: FilterSearch[] = modal.listSearch;
        listFilterSearch.forEach((filterSearch, index) => {
            if(modal.values[filterSearch.field] != undefined){
                fieldFilters += `<b>${filterSearch.header}:</b> `;
                fieldFilters += `${(
                    filterSearch.fieldObject && filterSearch.labelFunction ? filterSearch.labelFunction(modal.values[filterSearch.fieldObject]) :
                    filterSearch.list && filterSearch.labelFunction ?  filterSearch.labelFunction(modal.values[filterSearch.fieldObject], filterSearch.list) :
                    filterSearch.labelFunction ? filterSearch.labelFunction(modal.values[filterSearch.field]) : 
                    modal.values[filterSearch.field]
                )}<br/>`;
            }
        });
        document.querySelector('#filters').innerHTML = fieldFilters;
    }

    generatePrintFilters(title:string, headerText:string, modal:{listSearch:FilterSearch[], values:any}):string{
        let header = `<center><h1>${title}</h1></center>`;
        header+= `<h2>${headerText}</h2>`;
        let listFilterSearch: FilterSearch[] = modal.listSearch;
        listFilterSearch.forEach((filterSearch, index) => {
            if(modal.values[filterSearch.field] != undefined){
                header += `<b>${filterSearch.header}:</b> `;
                header += `${(
                    filterSearch.fieldObject && filterSearch.labelFunction ? filterSearch.labelFunction(modal.values[filterSearch.fieldObject]) :
                    filterSearch.list && filterSearch.labelFunction ?  filterSearch.labelFunction(modal.values[filterSearch.fieldObject], filterSearch.list) :
                    filterSearch.labelFunction ? filterSearch.labelFunction(modal.values[filterSearch.field]) : 
                    modal.values[filterSearch.field]
                )}<br/>`;
            }
        });
        header += '<br /><br />';
        return header;
    }

    generateDataChart(values:any, items:any):IChartData{
        let map:Map<any, number> = new Map();
        for(let item of items){
            if(!map.has(item[values.campoAnalisado.dataField])){
                map.set(item[values.campoAnalisado.dataField], 1);
            }
            else{
                map.set(item[values.campoAnalisado.dataField], (map.get(item[values.campoAnalisado.dataField])+1));
            }
        }
        if(values.campoAnalisado.resumir_outros && map.size > 10){
            let mapOrdenado:Map<any, number> = new Map();
            for(var i = 0; i < 10; i++){
                let maiorKey:string = null;
                for(let key of map.keys()){
                    if(maiorKey == null || map.get(key) > map.get(maiorKey)){
                        maiorKey = key;
                    }
                }
                mapOrdenado.set(maiorKey, map.get(maiorKey));
                map.delete(maiorKey);
            }
            mapOrdenado.set(-1, 0);
            for(let key of map.keys()){
                mapOrdenado.set(-1, mapOrdenado.get(-1)+map.get(key));
            }
            map = mapOrdenado;
        }

        let labels:any[] = [];
        let dataSet:any[] = [];
        for(let key of map.keys()){
            labels.push(`${(
                values.campoAnalisado.labels ? values.campoAnalisado.labels.get(key) : 
                key == -1 ? 'Outros' : 
                values.campoAnalisado.list ? (values.campoAnalisado.list as any[]).find((value) => value[values.campoAnalisado.dataField] == key)[values.campoAnalisado.labelField] : 
                key
            )}`);
            dataSet.push(map.get(key));
        }

        const data:IChartData = {
            labels: labels,
            datasets: [{ 
                data: dataSet,
                backgroundColor: this._COLORS,
                borderWidth: 1
            }],
        };

        return data;
    }

    mensal(formGroup:FormGroup, items:any[]):IChartData{
        let campoData:string = formGroup.value.campoAnalisado.dataField;
        let map:Map<string, number> = new Map();
        for(let item of items){
            let date:Date = new Date(item[campoData]);
            let mesAno = `${MesLabels.get(date.getMonth())}/${date.getFullYear()}`;
            if(map.has(mesAno))
                map.set(mesAno, map.get(mesAno) + 1);
            else
                map.set(mesAno, 1);
        }
        return this._createData(map);
    }

    porHora(formGroup:FormGroup, items:any[]):IChartData{
        let campoHora:string = formGroup.value.campoAnalisado.dataField;
        let map:Map<string, number> = new Map();
        for(let item of items){
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
        
        return this._createData(map);
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
            datasets: [{ 
                data: dataSet,
                backgroundColor: this._COLORS,
                borderWidth: 1
            }],
        };
    }


}