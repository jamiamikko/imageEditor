import { ImageEditorPage } from './app.po';

describe('image-editor App', function() {
  let page: ImageEditorPage;

  beforeEach(() => {
    page = new ImageEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
