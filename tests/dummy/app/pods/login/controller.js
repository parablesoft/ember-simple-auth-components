import Ember from 'ember';
import Config from "ember-simple-auth/configuration";

const {RSVP,set,get,Controller,computed} = Ember;
const {service,controller} = Ember.inject;
const {alias} = computed;


export default Controller.extend({
  routeAfterAuthentication: computed(function(){
    return Config.routeAfterAuthentication;
  }),
  application: controller(),
  session: service(),
  isLoggingIn: alias("application.isLoggingIn"),
  actions: {
    authenticate: function(){
      set(this,"application.isLoggingIn",true)
      let transition = get(this,"session.attemptedTransition");
      let {identification,password} = this.getProperties("identification","password");
      get(this,"session").authenticate('authenticator:devise',identification,password).then(()=>{
	this.set("application.isLoggingIn",false);
	this.set("errorMessage",null);
	transition == null ? this.transitionToRoute(get(this,"routeAfterAuthentication")) : transition.retry();
      }).catch((reason) =>{
	this.set("application.isLoggingIn",false);
	this.set("errorMessage","Invalid username or password!");
	this.set("password","");
      });
    }
  }
});
