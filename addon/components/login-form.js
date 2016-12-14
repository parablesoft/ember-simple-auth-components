import Ember from 'ember';
import Configuration from './../configuration';
import layout from '../templates/components/login-form';

const {Component,computed} = Ember;
const {alias} = computed;
export default Component.extend({
  layout,
  logo: computed(function() {
    return Configuration.logo;
  }),
  forgotPasswordRoute: computed(function(){
    return Configuration.forgotPasswordRoute;
  }),
});
