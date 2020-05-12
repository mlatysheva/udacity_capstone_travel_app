import { checkInput } from '../src/client/js/inputChecker'

test('empty string', () =>{
const jsdomAlert = window.alert; 
window.alert = () => {}; 
{ expect(checkInput('')).
toBeNull}
window.alert = jsdomAlert; 
});