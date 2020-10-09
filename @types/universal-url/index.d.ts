declare module 'universal-url' {
  import url from 'url';

  // eslint-disable-next-line import/prefer-default-export
  export class URL extends url.URL {}
}
