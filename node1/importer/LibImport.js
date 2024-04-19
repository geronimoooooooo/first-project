import * as libImportHelper from './LibImportHelper.js'


const result = libImportHelper.sub(10,1);
console.log(result + libImportHelper.PI);



//#region import {}
import {sub as s, mult as m} from './LibImportHelper.js'
console.log(s(5,4));
console.log(m(5,4));
//#endregion

