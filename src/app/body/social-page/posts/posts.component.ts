/***********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * Author : Twinkle Chatterjee <ctwinkle2812@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { Post, Comment } from 'src/app/Interface/SocialInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ToolsService } from '../../../services/tool/tools.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  showCommentList: boolean = false
  public CommentObservable: Observable<Comment[]>
  showAddComment: boolean = false
  enableLoader: boolean;
  todayDate: string;
  time: string;
  content: string = ""
  reactionStatus : boolean = false;
  public comments: Comment[];
  
  @Input('post') post : Post;
  @Output() addCommentCompleted = new EventEmitter<boolean>();

  constructor(public toolService: ToolsService, private functions: AngularFireFunctions, public authService: AuthService, private userService: UserServiceService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  showCommentBox(postId: string) {
    this.showCommentList = true;
    this.showAddComment = true
    this.getComments(postId);
  }

  openAddComment(postId: string) {
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.enableLoader = true;

    if(this.content != "" ) {

      const callable = this.functions.httpsCallable("socialPage/addPostComment");
      const res = callable({Uid: uid, Content: this.content, LastUpdatedDate: date, LastUpdatedTime: time, PostId: postId}).pipe(map(res=>{
        return res
      })).subscribe((data) => {
        this.enableLoader = false;
        this.addCommentCompleted.emit(true);
        this.content = "";
        this.getComments(postId);
      });
    }
  }
  
  close() {
    this.showAddComment = false;
  }

  async onReact(postId: string) {
    this.enableLoader = true;
    const uid = this.authService.getLoggedInUser();

    const callable = this.functions.httpsCallable('socialPage/addReaction');
   
      this.todayDate = this.toolService.date();
      this.time = this.toolService.time();

      await callable({PostId: postId, CreationDate: this.todayDate, CreationTime: this.time, Type: "Like", Uid: uid}).subscribe({
        next: (data) => {
        },
        error: (error) => {
          console.log("Error", error);
          this.errorHandlerService.showError = true;
          console.error(error);
        },
        complete: () => console.info('Successful')
    });
     
  }

  getComments(postId: string) {
      const callable = this.functions.httpsCallable("socialPage/getComments");
      const res = callable({PostId: postId}).pipe(map(res=>{
        const data = res.data as Comment[];
        return data
      })).subscribe((data) => {
        if (data) {
          this.enableLoader= true;
          this.comments = data;
        }
        this.enableLoader = false;
      });
  }

}