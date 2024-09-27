import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { APIresponse, Customer } from './model/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from './service/train.service';
import { FooterComponent } from "./pages/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  router =  inject(Router);
registerObj: Customer = new Customer();
trainService = inject(TrainService);
loginObj: any = {
    "phone": "",
    "password": ""
}
loggedUser: Customer = new Customer();
constructor(){
  const localData = localStorage.getItem('trainApp');
  if(localData != null){
    this.loggedUser = JSON.parse(localData)
  }
}

onRegister(){
this.trainService.createNewCustmer(this.registerObj).subscribe((res:APIresponse) =>{
if(res.result){ 
  alert("Registration Sucess")
}else{
  alert(res.message)}
})
}

onlogOff(){
this.loggedUser = new Customer();
localStorage.removeItem("trainApp")
this.router.navigate(['/home'])

}

 onLogin(){
  this.trainService.onLogin(this.loginObj).subscribe((res:APIresponse) =>{
  if(res.result){ 
    alert("Login Sucess")
    localStorage.setItem('trainApp', JSON.stringify(res.data))
    window.location.reload();
  }else{
    alert(res.message)
  }
  })
   }

  openRegister(){
    const model = document.getElementById('registerModel');
    if(model != null ){
      model.style.display = ' block'
    }
  }
  openLogin(){
    const model = document.getElementById('loginModel');
    if(model != null ){
      model.style.display = ' block'
    }
  }

  closeRegister(){
    const model = document.getElementById('registerModel');
    if(model != null ){
      model.style.display = ' none'
    }
  }
  closeLogin(){
    const model = document.getElementById('loginModel');
    if(model != null ){
      model.style.display = ' none'
      
    }
   
  }
}
