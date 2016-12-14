import Ember from 'ember';
import ENV from '../config/environment';
import Configuration from 'ember-simple-auth-components/configuration';

export default {
  name:       'ember-simple-auth-components',
  initialize: function(registry) {
    const config   = ENV['ember-simple-auth-components'] || {};
    Configuration.load(config);
  }
};
