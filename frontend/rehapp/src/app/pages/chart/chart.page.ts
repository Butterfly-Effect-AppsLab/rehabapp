import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { StateService } from 'src/app/services/state-service.service';
import { APIService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {

  @ViewChild('chart', { static: false }) chart: ElementRef;

  constructor(
    private stateService: StateService,
    private apiService: APIService
  ) { }

  ngOnInit() {
    // this.apiService.getMe().subscribe((resp)=>{
    //   console.log(resp);
    // });
  }

  ionViewDidEnter(){
    Chart.defaults.scale.gridLines.drawOnChartArea  = false;
    var myChart = new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
          labels: ['Po', 'Ut', 'St', 'St', 'Pi', 'So', 'Ne'],
          datasets: [{
              label: 'Pain level',
              data: [2, 9, 3, 5, 2, 3, 0],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ]
          }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
          scales: {
              yAxes: [{
                ticks: {
                  // display: false,
                  drawTicks: false,
                  padding: 10,
                    beginAtZero: true,
                    max: 10
                },
                gridLines:{
                  // display: false,
                  // drawBorder: false,
                  drawTicks: false,
                  
                }
            }],
            xAxes: [{
              ticks: {
                padding: 10,
                // display: false,
                drawTicks: false
                  // beginAtZero: true,
                  // max: 10
              },
              gridLines:{
                // display: false,
                // drawBorder: false,
                drawTicks: false
              }
          }]
          }
      }
  });
  }

}
