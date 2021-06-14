import { Component, Input, Output, EventEmitter  } from "@angular/core";
import { UserService } from "src/app/home/users/user.service";


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent{

  @Input() message: string;

  @Input() id: number;

  @Output() close = new EventEmitter<void>();

  constructor(private userService: UserService){

  }

  onClose(){
    this.close.emit();
  }

  onSelect() {

    console.log(this.id + ' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    this.userService.deleteUser(this.id);
    this.close.emit();


  }

}
