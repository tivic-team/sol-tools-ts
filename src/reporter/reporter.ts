import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { FilterSearch } from "./filter-search";
import { HeaderReport } from "./header-report";

export class Reporter{

    header:HeaderReport;
    title:string;
    valuesFilter:any;
    listFilterSearch:FilterSearch[];
    columns:any[];
    registers:any[];
    footer:string;
    orientation:"p" | "portrait" | "l" | "landscape";
    alturaAtual = 0;

    _generateLogo(doc:jsPDF):void{
        doc.setFontSize(12);
        if(this.header && this.header.base64Img){
            this.alturaAtual+=10;
            let comprimento = 35;
            doc.addImage(this.header.base64Img, 'JPEG', this.alturaAtual, 10, 20, 20);

            if(this.header && this.header.headerTitle1){
                doc.text(this.header.headerTitle1, comprimento, this.alturaAtual+5);
            }
            if(this.header && this.header.headerTitle2){
                doc.text(this.header.headerTitle2, comprimento, this.alturaAtual+10);
            }
            if(this.header && this.header.headerTitle3){
                doc.text(this.header.headerTitle3, comprimento, this.alturaAtual+15);
            }
            this.alturaAtual+=10;
        }
        else if (this.header){
            this.alturaAtual+=10;
            let comprimento = 10;
            if(this.header && this.header.headerTitle1){
                doc.text(this.header.headerTitle1, comprimento, this.alturaAtual+5);
            }
            if(this.header && this.header.headerTitle2){
                doc.text(this.header.headerTitle2, comprimento, this.alturaAtual+10);
            }
            if(this.header && this.header.headerTitle3){
                doc.text(this.header.headerTitle3, comprimento, this.alturaAtual+15);
            }
            this.alturaAtual+=10;
        }
        
        
    }

    _generateTitle(doc:jsPDF):void{
        this.alturaAtual+=25;
        doc.setFontSize(20);
        doc.setFont('times', 'bold');
        doc.text(this.title, ((doc.internal.pageSize.width/2)-((this.title.length*4)/2)), this.alturaAtual);
    }

    _generateFilters(doc:jsPDF):number{
        let filterColumns:{filtro:string,valor:string}[] = [];
        for(let index:number=0; index < this.listFilterSearch.length; index++){
            let criterio = this.listFilterSearch[index];
            if(this.valuesFilter[criterio.field]){
                filterColumns.push({
                    filtro: criterio.header, 
                    valor: `${(
                        criterio.fieldObject && criterio.labelFunction ? criterio.labelFunction(this.valuesFilter[criterio.fieldObject]) :
                        criterio.labelFunction ? criterio.labelFunction(this.valuesFilter[criterio.field]) : this.valuesFilter[criterio.field]
                    )}`
                });
            }
        }
        this.alturaAtual += 25;
        let cursor = 15;
        let quantidadeLinhas = 0;
        if(filterColumns.length > 0){
            quantidadeLinhas++;
            filterColumns.forEach((item, index) => {
                let filtroSizeTotal = (item.filtro.length*2)+5+(item.valor.length*2.3)+15;
                if(cursor + filtroSizeTotal >= (doc.internal.pageSize.width-15)){
                    cursor = 15;
                    this.alturaAtual += 10;
                    quantidadeLinhas++;
                }
                doc.setFontSize(12);
                doc.setFont('times', 'bold');
                doc.text(`${item.filtro}:`, cursor, this.alturaAtual);
                doc.setFontSize(12);
                doc.setFont('times', 'normal');
                doc.text(item.valor, cursor+(item.filtro.length*2)+5, this.alturaAtual);    
                cursor += filtroSizeTotal;
    
                
            });
        }
        
        doc.line(10, (this.alturaAtual + (10*quantidadeLinhas)), doc.internal.pageSize.width-10, (this.alturaAtual + (10*quantidadeLinhas)));

        return quantidadeLinhas;

    }

    _generateTable(doc:jsPDF, quantidadeLinhas:number){
        this.alturaAtual += 5;
        let head:any[] = this._generateColumns();
        let data:any[] = this._generateData();
        let footer:string = this.footer;

        doc.setFontSize(11);
        doc.setTextColor(100);

        (doc as any).autoTable({
            head: head,
            body: data,
            theme: 'plain',
            startY: (this.alturaAtual + (10*quantidadeLinhas)),
            showHead: "everyPage",
            didDrawPage: function (data) {
                doc.setFontSize(10);
                doc.text(footer, 10, doc.internal.pageSize.height - 10);
            }
        })
    }

    _generateColumns():any[]{
        var internalHead:any[] = [];
        this.columns.forEach(column => {
            internalHead.push(column.headerText);
        });
        let head = [];
        head.push(internalHead);
        return head;
    }

    _generateData():any[]{
        let data = [];
        this.registers.forEach((value, index) => {
            var internalArray = [];
            this.columns.forEach(column => {
                internalArray.push(value[column.dataField]); 
            });
            internalArray.forEach((element, j) => {
                if(this.columns[j] && this.columns[j].labelFunction){
                    internalArray[j] = this.columns[j].labelFunction(this.columns[j], value);
                }
            });
            data.push(internalArray);
        });
        return data;
    }

    buildReport(){
        var doc = new jsPDF({
            orientation: this.orientation,
        });
        this._generateLogo(doc);
        this._generateTitle(doc);
        let quantidadeLinhas:number = this._generateFilters(doc);
        this._generateTable(doc, quantidadeLinhas);
        doc.output('dataurlnewwindow')
    }

}