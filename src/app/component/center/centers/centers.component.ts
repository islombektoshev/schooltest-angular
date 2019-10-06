import {Component, OnInit} from '@angular/core';
import {CenterService} from "../../../service/center/center.service";
import {CenterModel} from "../../../models/center/center-model";
import {ActivatedRoute, Router} from "@angular/router";
import {NodeService} from "../../../service/nodeservice/node.service";

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {

  private centerModels: CenterModel[];
  private center: CenterModel;
  private isCenterSelected: boolean = false;


  constructor(private centerService: CenterService, private route: ActivatedRoute, private router: Router, private nodes: NodeService) {
    this.isCenterSelected = false;
    route.params.subscribe(value => {
      if (value.centername != undefined) {
        this.onCenterSelected(value.centername);
      }
    });
  }

  ngOnInit() {
    this.centerService.getCenters(centers => {
      this.centerModels = centers;
    });
  }

  onCenterClick(name: string) {
    console.log(name);
    this.router.navigate(['/home/centers/' + name]);
  }

  onCenterSelected(centername__: string) {
    this.centerService.getCenter(centername__, __center => {
      this.center = __center;
      this.isCenterSelected = true;
    }, er => {
      this.router.navigate([{centername: centername__}]);
    })
  }

  onStudentLinkClicked() {
    if (this.center != null) {
      console.log(this.center.name);
      this.nodes.set('app.centername.selected', this.center.name);
      this.router.navigate([`/home/centers/${this.center.name}/students`]);
    }
  }
}
