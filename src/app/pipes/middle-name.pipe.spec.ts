import { MiddleNamePipe } from './middle-name.pipe';

describe('MiddleNamePipe', () => {
  it('create an instance', () => {
    const pipe = new MiddleNamePipe();
    expect(pipe).toBeTruthy();
  });
});
