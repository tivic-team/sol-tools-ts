import { FilterSearch } from "../reporter/filter-search";
import { IChartData } from "./chart-data";

export class ManagerModalChart{

    generateFieldFilters(modal:{listSearch:FilterSearch[], values:any}):void{
        let fieldFilters = "";
        let listFilterSearch: FilterSearch[] = modal.listSearch;
        listFilterSearch.forEach((filterSearch, index) => {
            if(modal.values[filterSearch.field]){
                fieldFilters += `<b>${filterSearch.header}:</b> `;
                fieldFilters += `${(
                    filterSearch.fieldObject && filterSearch.labelFunction ? filterSearch.labelFunction(modal.values[filterSearch.fieldObject]) :
                    filterSearch.labelFunction ? filterSearch.labelFunction(modal.values[filterSearch.field]) : modal.values[filterSearch.field]
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
            if(modal.values[filterSearch.field]){
                header += `<b>${filterSearch.header}:</b> `;
                header += `${(
                    filterSearch.fieldObject && filterSearch.labelFunction ? filterSearch.labelFunction(modal.values[filterSearch.fieldObject]) :
                    filterSearch.labelFunction ? filterSearch.labelFunction(modal.values[filterSearch.field]) : modal.values[filterSearch.field]
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

        const COLORS = [
            '#4dc9f6',
            '#f67019',
            '#f53794',
            '#537bc4',
            '#acc236',
            '#166a8f',
            '#00a950',
            '#58595b',
            '#8549ba'
        ];

        const data:IChartData = {
            labels: labels,
            datasets: [{ 
                data: dataSet,
                backgroundColor: COLORS,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }],
        };

        return data;
    }

}