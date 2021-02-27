import { Injectable } from '@angular/core';
import { Adapter } from './Adapter';

export class Post {
Id: string;
employeeName: string;
managerName: string;
employeeEmail: string;
managerEmail: string;
leaveReason: string;
status: string;
submitionDate:string;
leaveDate:string;





constructor(response: any) {
    this.Id = response._id;
    this.employeeName = response.employeeName;
    this.managerName = response.managerName;
    this.employeeEmail = response.employeeEmail;
    this.managerEmail = response.managerEmail;
    this.leaveReason = response.leaveReason;
    this.leaveDate = response.leaveDate;
    this.status = response.status;
    this.submitionDate = response.submitionDate;


}
}

@Injectable({
    providedIn: 'root'
  })

export class PostsAdapter implements Adapter<Post> {
    adapt(item: any): Post {
      return new Post(item);
    }
  }