import { Component, OnInit, ViewChild } from '@angular/core';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { DocumentsService  } from 'app/services/data/documents.service';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';






@Component({
  selector: 'app-test-wz',
  templateUrl: './test-wz.component.html',
  styleUrls: ['./test-wz.component.css']
})
export class TestWZComponent implements OnInit {

  pivotGridDataSource: any;
  showDataFields: boolean = true;
  showRowFields: boolean = true;
  showColumnFields: boolean = true;
  showFilterFields: boolean = true;


  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;



  constructor(private documentsSer: DocumentsService) {

    // this.customizeTooltip = this.customizeTooltip.bind(this);

    documentsSer.getPZForReport().subscribe((dates) => {
      this.pivotGridDataSource = new PivotGridDataSource({
        fields: [{
          caption: "Supplier",
          width: 250,
          dataField: "supplier",
          area: "row"
        }, {
          caption: "Tovar",
          dataField: "tovar",
          width: 300,
          area: "row",
          // selector: function (data: Purchases) {
          //   return data.supplier + " (" + data.tovar + ")";
          // }
        }, {
          dataField: "date",
          dataType: "date",
          area: "column"
        }, {
          dataField: "quantity",
          dataType: "number",
          summaryType: "sum",
          //format: "currency:PLN",
          //format:  Globalize.currencyFormatter( "USD" ),
          format: {type: "fixedPoint", precision: 3},
          area: "data"
        }, {
          dataField: "summa",
          dataType: "number",
          summaryType: "sum",
          format: {type: "currency", currency: "PLN", precision: 2} ,
          // format: {  formatter: (value) => {
          //   //Math.round(numbertobeRound*10^decimalplaces)/10^decimalplaces)
          //   return "PLN " + Math.round(Number(value)*100)/100;
          // }},
          // format: {type: "currency", precision: 2},
          area: "data"
        }],
        store: dates //service.getSales()
      });
    });

  }

  // getCustomerCurrency (date) {
  //   var month = date.getMonth() + 1,
  //       day = date.getDate(),
  //       year = date.getFullYear();
 
  //   return year + "." + month + "." + day;
  // }


  // export type format = 'billions' | 'currency' | 'day' | 'decimal' | 'exponential' | 'fixedPoint' | 'largeNumber' | 'longDate' | 'longTime' | 'millions' | 'millisecond' | 'month' | 'monthAndDay' | 'monthAndYear' | 'percent' | 'quarter' | 'quarterAndYear' | 'shortDate' | 'shortTime' | 'thousands' | 'trillions' | 'year' | 'dayOfWeek' | 'hour' | 'longDateLongTime' | 'minute' | 'second' | 'shortDateShortTime' | string | ((value: number | Date) => string) | { type?: 'billions' | 'currency' | 'day' | 'decimal' | 'exponential' | 'fixedPoint' | 'largeNumber' | 'longDate' | 'longTime' | 'millions' | 'millisecond' | 'month' | 'monthAndDay' | 'monthAndYear' | 'percent' | 'quarter' | 'quarterAndYear' | 'shortDate' | 'shortTime' | 'thousands' | 'trillions' | 'year' | 'dayOfWeek' | 'hour' | 'longDateLongTime' | 'minute' | 'second' | 'shortDateShortTime', precision?: number, currency?: string, formatter?: ((value: number | Date) => string), parser?: ((value: string) => number | Date) };

  customizeTooltip(args) {
    return {
      html: args.seriesName + " | Total<div class='currency'>" + args.valueText + "</div>"
    };
  }


  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });

    setTimeout(() => {
        var dataSource = this.pivotGrid.instance.getDataSource();
        dataSource.expandHeaderItem('row', []);
        dataSource.expandHeaderItem('column', []);
    }, 0);
  }

  contextMenuPreparing(e) {
    var dataSource = e.component.getDataSource(),
      sourceField = e.field;

    if (sourceField) {
      if (!sourceField.groupName || sourceField.groupIndex === 0) {
        e.items.push({
          text: "Hide field",
          onItemClick: function () {
            var fieldIndex;
            if (sourceField.groupName) {
              fieldIndex = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex].index;
            } else {
              fieldIndex = sourceField.index;
            }

            dataSource.field(fieldIndex, {
              area: null
            });
            dataSource.load();
          }
        });
      }

      if (sourceField.dataType === "number") {
        var setSummaryType = function (args) {
          dataSource.field(sourceField.index, {
            summaryType: args.itemData.value
          });

          dataSource.load();
        },
          menuItems = [];

        e.items.push({ text: "Summary Type", items: menuItems });

        for (let summaryType of ["Sum", "Avg", "Min", "Max"]) {
          var summaryTypeValue = summaryType.toLowerCase();

          menuItems.push({
            text: summaryType,
            value: summaryType.toLowerCase(),
            onItemClick: setSummaryType,
            selected: e.field.summaryType === summaryTypeValue
          });
        };
      }
    }
  }

  ngOnInit() {
  }

}
