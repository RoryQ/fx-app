import { FxAppPage } from './app.po';

describe('fx-app App', function() {
  let page: FxAppPage;

  beforeEach(() => {
    page = new FxAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
