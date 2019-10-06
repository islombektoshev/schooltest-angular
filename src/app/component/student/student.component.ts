import {Component, Input, OnInit} from '@angular/core';
import {StudentService} from "../../service/student/student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentModel} from "../../models/student/student-model";
import {NodeService} from "../../service/nodeservice/node.service";
import {GroupModel} from "../../models/group/group-model";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private isShowAllStudents: boolean = false;
  private students: StudentModel[];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.students;

  @Input('centername') centername: string;

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute, private nodes: NodeService) {
  }

  ngOnInit() {
    if (this.nodes.has('app.centername.selected')) {
      let centername = this.nodes.get('app.centername.selected');
      this.centername = centername;
      console.log(centername);
      this.showAllStudents(centername);
    }
  }

  showAllStudents(centername: string) {
    this.studentService.getStudents(centername,
      _students => {
        this.students = _students;
        this.isShowAllStudents = true;
      },
      _error => {
        this.isShowAllStudents = false;
      })
  }

  studentGroups(student: StudentModel) {
    this.studentService.getStudentGroups(this.centername, student.id,
      groups1 => {
        student.group = groups1;
      });
    return student;
  }

}
