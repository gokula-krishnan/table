import {Component} from '@angular/core';
import {MainService} from './services/mainService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiData = {};
  projectDetails = [];
  apiKeys = [];
  stories = [];
  storyKeys = [];
  storyValues = [];
  tableHeadings = [];
  category = [];
  testplan = [];

  constructor(private  mainService: MainService) {
    this.mainService.sampleApi().subscribe(data => {
      this.apiData = data;
      this.apiKeys = Object.keys(this.apiData);
      //console.log(this.apiKeys);
      for (let key of this.apiKeys) {
        this.projectDetails.push(this.apiData[key]);
      }
      this.stories = new Array(this.apiKeys.length);
    }, err => {
      console.log(err);
    });
    this.tableHeadings = [
      'Project Name',
      'Project Id',
      'Automatable_TC',
      'Automated_TC',
      'Goal Automation',
      'Goldmine Monitor Flag',
      'Item Status',
      'Item Type',
      'Percent Automation',
      'Product Name',
      'Product Release',
      'Test Link',
      'Total_TC'
    ];

  }


  /*title = 'app';*/
  isstoryopen: boolean[] = new Array(this.apiKeys.length);
  state: any[] = new Array(this.apiKeys.length);

  toggleStory(index) {
    this.isstoryopen[index] = !this.isstoryopen[index];
    this.state[index] = this.isstoryopen[index] ? 'open' : 'close';
    this.stories[index] = this.apiData[this.apiKeys[index]].stories;
    this.storyKeys[index] = Object.keys(this.stories[index]);
    let dummy = [];
    this.storyKeys[index].forEach(item => {
      dummy.push(this.stories[index][item]);
    });
    this.storyValues[index] = dummy;
  }

  iscategoryopen: boolean[][] = new Array(this.storyKeys.length);
  categoryKeys: any[] = new Array(this.storyKeys.length);

  toggleCategory(prindex, stindex) {
    //console.log(prindex, stindex);
    if(!this.iscategoryopen[prindex]){
      this.iscategoryopen[prindex] = new Array(this.storyKeys.length);
    }
    this.iscategoryopen[prindex][stindex] = !this.iscategoryopen[prindex][stindex];
    //console.log(this.iscategoryopen[stindex]);
    this.categoryKeys[stindex] = Object.keys(this.storyValues[prindex][stindex].categories);
    let dummy1 = [];
    this.categoryKeys[stindex].forEach(item => {
      dummy1.push(this.storyValues[prindex][stindex].categories[item]);
    });
    this.category[stindex] = dummy1;

  }
  istestplanopen: boolean[][] = new Array(this.categoryKeys.length);
  testplanKeys: any[] = new Array(this.categoryKeys.length);
  toggleTestPlan(sindex, cgindex) {
    if(!this.istestplanopen[sindex]){
      this.category[sindex].forEach(item => {
        this.istestplanopen.push(new Array(item.length));
      });
    }
    this.istestplanopen[sindex][cgindex] = !this.istestplanopen[sindex][cgindex];
    console.log(this.istestplanopen);
    this.testplanKeys[cgindex] = Object.keys(this.category[sindex][cgindex].test_plans);
    let dummy2 = [];
    this.testplanKeys[cgindex].forEach(item =>{
      dummy2.push(this.category[sindex][cgindex].test_plans[item]);
    });
    this.testplan[cgindex] = dummy2;
  }


}
