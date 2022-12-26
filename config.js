/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/


module.exports = {
  build: {
    templates: {
      source: 'src/views/mail/templates',
      destination: {
        path: 'build_local',
      },
      assets: {
        source: 'src/views/mail/images',
        destination: 'images',
      },
      tailwind: {
        css: 'src/views/mail/css/tailwind.css',
        config: 'tailwind.config.js',
        compiled: ''
      },
      baseURL: {
        url: 'https://cdn.example.com/',
        tags: ['img'],
        inlineCss: false,
      },
    },
  },
}
