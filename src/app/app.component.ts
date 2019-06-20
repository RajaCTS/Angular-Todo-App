import { Component, OnInit } from '@angular/core';
import { ThemeChangerService } from './services/theme-changer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  appTheme;
  title = 'my-development-app';
  condition = true;
  constructor(private ChangeThemeService: ThemeChangerService) { }
  
  ngOnInit() {
    this.ChangeThemeService.theme.subscribe((data)=>{
      this.appTheme = data;
      if (this.appTheme == "light") {
        document.querySelector('body').style.backgroundColor = '#ffffff';
      } else if (this.appTheme == "dark") {
        document.querySelector('body').style.backgroundColor = '#000000';
      }
    })
  }
}
