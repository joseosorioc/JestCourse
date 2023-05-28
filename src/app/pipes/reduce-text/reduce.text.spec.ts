import { ReduceTextPipe } from './reduce-text.pipe';

describe('reduce text test' , () => {

  let pipe: ReduceTextPipe;

  beforeEach( () => {
    pipe = new ReduceTextPipe();
  });

test('should create' , () => {
  expect(pipe).toBeTruthy();
})

/**
 *   transform(value: string, ...args: number[]): string {
    return value.substring(0, args[0]);
  }
 */

  test('should use transform text correctly' , () => {
      const text = 'hello, this is the text to test';
      const newText = pipe.transform(text, 5);

      expect(newText.length).toBe(5);
  })


})
