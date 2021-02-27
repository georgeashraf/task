import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public Posts: Post[];
  public Managers: string[];

  public leavetext: string;
  public managername: string;
  public date: string;

  public submitmessage: string;
  alert=false;
  submmitedPosts=false;
  repattern = /([0-9]{4})/;

  constructor(private postservice: PostsService ,route:ActivatedRoute) {

   }

  ngOnInit() {
    this.postservice.getPosts().subscribe(posts => {this.Posts = posts ;
      (posts.length==0) ? this.submmitedPosts=false : this.submmitedPosts=true
      console.log(posts)
    });
    this.postservice.getManagers().subscribe(managers => this.Managers = managers);
  }
  events: string[] = [];
  form = new FormGroup({
    leavetext: new FormControl('', [
      Validators.required,
    ]),
    managername: new FormControl('', [
      Validators.required,
    ])
    
   });

  addEvent( event: MatDatepickerInputEvent<Date>) {
    this.date = `${event.value}`;
     console.log(`${event.value}`)
  }
  getposts() {
    this.postservice.getPosts().subscribe(posts => this.Posts = posts );
  }

  deletepost(event, postid) {
    const postbody = {
      leaveId: postid
    };
    this.postservice.deletePost(postbody).subscribe(response =>{ 
      this.submitmessage = response.msg
      this.alert = true;
      this.getposts();
      setTimeout(function() {
        this.alert = false;
      }.bind(this), 3000);
    });
    
  }

  submitPost() {
    console.log(this.form.value)
   const postbody = {
      managername: this.form.value.managername,
      leave: this.form.value.leavetext,
      leavedate: this.date
    };
   
   this.postservice.submitPost(postbody).subscribe(response => {
     
    this.submitmessage = response.msg;
    this.alert = true
    this.getposts();
    setTimeout(function() {
      this.alert = false;
    }.bind(this), 3000);
  });
     

  
  }



  // applyFilter() {
  //   console.log(this.submitFilter);
  //   this.postservice.getFilteredPosts(this.submitFilter).subscribe(posts => this.Posts = posts );
  // }
}
