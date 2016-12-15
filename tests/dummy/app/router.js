import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('forgot_password');
  this.route('reset_password', {path: 'reset_password/:token'});
  this.route('users',function(){
    this.route('confirmation', {path: 'confirmation/:token_id'});
  });
  this.route('admin', function() {
    this.route('settings');
  });
});

export default Router;
