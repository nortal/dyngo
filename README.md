# Dyngo

Provides a functionality for building forms in Angular according to structure and rules described in JSON that corresponds to a [Form.io schema](https://github.com/formio/formio.js/wiki/Form-JSON-Schema).

## License
MIT

## Features (short version):
* Supports basic HTML input types
* Possibility to add custom input types
* Defining constraints
  * Supported constraints: min, max, required, enabled, visible
  * Constraints are evaluated in runtime and they may depend on form data
  * Ability to show previous data and it's diff with current data
  * Ability to define custom constraints
* Functions support
* Custom display options support

## Dependencies:
* Angular 6.0.3+
* [Kendo UI for Angular](https://www.telerik.com/kendo-angular-ui)

## Demo 
```bash
  npm install
  ng serve
```
Navigate to [http://localhost:4200]([http://localhost:4200]) in your browser  
  
## Installation
1. Attach dyngo to your project. As Dyngo is published in NPM registry, then the easiest way is to use NPM:
`npm install --save dyngo-lib`
2. Add Dyngo as a dependency to your Angular module:
```js
import { DyngoModule } from 'dyngo-lib';

@NgModule({
  imports: [
    ...
    DyngoModule,
    ...
   ]
 })
```
3. Obtain form structure, initialize and register your form with initial data and options:
```js
let formStructure = COMPOSE_OR_LOAD_FORM_STRUCTURE_FROM_IT_S_UP_TO_YOU;
let form = Object.assign(formStructure, <FormioForm>{
  data: this.item.data.current,
  readonly: this.readOnly
});
formService.registerForm('myForm', form);
```
5. Add your form to HTML template:
```html
<dg-form name="myForm"></dg-form>
```

## Building & publishing
First, increase version number in projects/dyngo-lib/package.json, then
```
 rm -rf dist
 ng build dyngo-lib
 cd dist/dyngo-lib
 npm publish
```
