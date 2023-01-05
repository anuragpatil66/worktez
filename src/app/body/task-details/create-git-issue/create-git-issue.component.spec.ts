/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Swapnil Bankar <swapnilbankar1010@gmail.com>
*
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGitIssueComponent } from './create-git-issue.component';

describe('CreateGitIssueComponent', () => {
  let component: CreateGitIssueComponent;
  let fixture: ComponentFixture<CreateGitIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGitIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGitIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
