# MusicPlayerApp
-------------------
# main commands to start creating App
ng new music-player-app
ng g c header  (check the component name in abc.component.ts file before calling it in any HTML file)
ng g c footer  (check the component name in abc.component.ts file before calling it in any HTML file)

-------------------

# install packages
npm i
or
npm i @angular/material@12.2 --save
npm i @angular/material@12.2 --save
npm i bootstrap --save

-------------------

# Errors
Q:      An unhandled exception occurred: ENOENT: no such file or directory, lstat 'E:\Angular_April2021\Angular*node_modules*'See  
        "C:\Users\abcd\AppData\Local\Temp\ng-ul0h3k\angular-errors.log" for further details.
Sol:    You need to remove slash before /node in below like:
        ``` "node_modules/bootstrap/dist/css/bootstrap.min.css". ```
-------------------

