import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent implements OnInit {
  public Posts: Post[];
  acceptmessage: any;
  alert = false;
  repattern = /([0-9]{4})/;
  submmitedPosts=false;

  constructor(private postservice: PostsService, route:ActivatedRoute) { 

  }

  ngOnInit() {
    this.postservice.getPosts().subscribe(posts => {this.Posts = posts;
      (posts.length==0) ? this.submmitedPosts=false : this.submmitedPosts=true
      console.log(posts)
    });
  }
  getposts() {
    this.postservice.getPosts().subscribe(posts => this.Posts = posts );
  }

  acceptLeave(event, postid,status){
    const postbody = {
      leaveId: postid,
      status:status
    };
    this.postservice.acceptLeave(postbody).subscribe(response => {this.acceptmessage = response.msg
      console.log(response.msg)
      this.alert = true;
      this.getposts();
      setTimeout(function() {
        this.alert = false;
      }.bind(this), 3000);
    });

  }
}
