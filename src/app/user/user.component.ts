import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, Observable } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm!: FormGroup;
  isUpdate = false;
  submitted = false;
  loading = false;
  users!: User[];
  user = new User();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.nullValidator],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      console.log('Form is invalid');
      return;
    }
    this.loading = true;
    this.userService.createUser(this.userForm.value).pipe(first()).subscribe(
      data => {
        this.user = data as User;
        console.log(data);
        this.fetchUsers();
        this.userForm.reset();
      })
  }

  onUpdate(id: number) {
    this.isUpdate = true;
    this.userService.getUser(id).pipe(first()).subscribe(
      data => {
        this.user = data as User;
        this.userForm.setValue({
          id: this.user.id,
          name: this.user.name,
          description: this.user.description
        });
      })
  }

  onDelete(id: number) {
    this.userService.deleteUser(id).pipe(first()).subscribe(
      data => {
        alert('User deleted successfully.');
        this.fetchUsers();
      })
  }

}
