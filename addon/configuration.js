import Ember from "ember";
const { getWithDefault,typeOf } = Ember;
const DEFAULTS = {
  logo: '/assets/images/logo.png',
  forgotPasswordRoute: 'forgot_password',

};
export default{
  logo: DEFAULTS.logo,
  forgotPasswordRoute: DEFAULTS.forgotPasswordRoute,
  load(config){
    for(let property in this){
      if (this.hasOwnProperty(property) && typeOf(this[property]) !== 'function'){
	this[property] = getWithDefault(config, property, DEFAULTS[property]);
      }
    }
  }
}
