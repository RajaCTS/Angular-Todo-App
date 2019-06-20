import { BehaviorSubject } from 'rxjs';

export class ThemeChangerService {
  
  themeData = window.sessionStorage.length && window.sessionStorage.getItem('theme') ? window.sessionStorage.getItem('theme'): "light";
  theme = new BehaviorSubject(this.themeData);

  themeinfo = this.theme.asObservable();

  themeChage = () => {
    var dataTheme:any;
    this.themeinfo.subscribe((data) => {      
      window.sessionStorage.setItem('theme',data);
      if (data == 'light') {
        dataTheme = 'dark';
      } else {
        dataTheme = 'light';
      }
    })
    this.theme.next(dataTheme);
  }
}
