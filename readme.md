# GravizoEditor2


Live
==
https://daniel-sc.github.io/gravizo_editor/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

Stack
==
- Angular2
- http://www.gravizo.com/

Deploy
==
```
ng build --aot --prod --base-href "/gravizo_editor/"
ngh
```

First time setup:
```
npm i -g angular-cli-ghpages
```

TODO
==
- ~~state as url query~~
  - enable/disable state as url query
  - ~~don't mess with state on graph download~~
- enable/disable auto convert
- ~~reactive~~
- ~~changed indicator reset when image loaded~~
- better editor
- ~~styling~~
- ~~auto semicolon~~
- convenience features:
  - ~~save image~~
  - insert templates
  - ...
