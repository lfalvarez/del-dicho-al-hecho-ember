/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    // include other plugin configuration that applies to all deploy targets here
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV['json-config'] = {
      fileInputPattern: 'index.html',
      fileOutputPattern: 'index.json',
      projectRoot: function(context) {
        return context.project.root;
      },
      distDir: function(context) {
        return 'dist';
      },
      outputPath:'dist',
      jsonBlueprint: {
        base: {
          selector: 'base',
          attributes: ['href']
        },
        meta: {
          selector: 'meta[name*="/config/environment"]',
          attributes: ['name', 'content']
        },
        link: {
          selector: 'link',
          attributes: ['rel', 'href', 'integrity']
        },
        script: {
          selector: 'script',
          attributes: ['src', 'integrity'],
          includeContent: false,
        }
      }
    };
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
