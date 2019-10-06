import {Injectable} from '@angular/core';
import {TokenService} from "../token/token.service";
import {HttpClient} from "@angular/common/http";
import {StudentModel} from "../../models/student/student-model";
import {MatTableModule} from '@angular/material/table';
import {GroupModel} from "../../models/group/group-model";
import {SubjectModel} from "../../models/subject/subject-model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl: string;

  constructor(private tokenService: TokenService, private httpClient: HttpClient) {
    this.baseUrl = tokenService.ulrBase;
  }

  getStudents(centername: string, callStudents: (students: StudentModel[]) => void, callError?: (error: any) => void) {
    this.httpClient.get<StudentModel[]>(this.getStudentsUrl(centername), {
      headers: {
        'Authorization': this.tokenService.getToken().token
      }
    }).subscribe(
      value => callStudents(value),
      error => callError(error)
    )
  }

  getStudent(centername: string, studentId: number, callStudents: (students: StudentModel) => void, callError?: (error: any) => void) {
    this.httpClient.get<StudentModel>(this.getStudentsUrl(centername, studentId), {
      headers: {
        'Authorization': this.tokenService.getToken().token
      }
    }).subscribe(value => callStudents(value), error => callError(error));
  }

  getStudentGroups(centername: string, studentId: number, callGroup: (groups: GroupModel) => void, callError?: (error: any) => void) {
    this.httpClient.get<GroupModel>(this.getStudentsUrl(centername, studentId, "group"), {
      headers: {
        'Authorization': this.tokenService.getToken().token
      }
    }).subscribe(value => callGroup(value), error => callError(error));
  }

  getStudentSubject(centername: string, studentId: number, callGroup: (groups: SubjectModel[]) => void, callError?: (error: any) => void) {
    this.httpClient.get<SubjectModel[]>(this.getStudentsUrl(centername, studentId, "subject"), {
      headers: {
        'Authorization': this.tokenService.getToken().token
      }
    }).subscribe(value => callGroup(value), error => callError(error));
  }

  private getStudentsUrl(centername: string, studentId_: number | null = null, o: "subject" | "group" | null = null): string {
    if (o != null) {
      if (o == "subject") {
        return `${this.baseUrl}/centers/${centername}/students/${studentId_}/subjects`;
      }
      if (o == "group") {
        return `${this.baseUrl}/centers/${centername}/students/${studentId_}/groups`;
      }
    }
    if (studentId_ != null) {
      return `${this.baseUrl}/centers/${centername}/students/${studentId_}`;
    }
    return `${this.baseUrl}/centers/${centername}/students`;
  }

}
