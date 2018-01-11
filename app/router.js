import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  rootURL: config.rootURL,
  location: config.locationType,
});

Router.map(function() {
  this.route('study', { path: '/study/:study_name' });
  this.route('about');
  this.route('methodology');
  this.route('government');
  this.route('government', {path: 'government/:slug'});
  this.route('compare-studies', { path: 'compare/studies/:studies'});
  this.route('404');
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});


export default Router;
