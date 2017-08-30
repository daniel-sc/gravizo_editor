import { GravizoEditor2Page } from './app.po';

describe('gravizo-editor2 App', () => {
  let page: GravizoEditor2Page;

  beforeEach(() => {
    page = new GravizoEditor2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
