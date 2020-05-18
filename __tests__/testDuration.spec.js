import { duration } from '../src/client/js/duration'

test('Calculate duration between two dates', () =>{
{ expect(duration('2020-05-20', '2020-05-25')).toBe(5)}
});