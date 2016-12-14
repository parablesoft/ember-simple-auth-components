import Ember from 'ember';
import Config from "<%=dasherizedPackageName%>/config/environment";

const {$,get,Controller} = Ember;
const {service} = Ember.inject;

export default Controller.extend({
  // notifier: service(),
  actions:{
    resetPassword(){
      let host = Config.APP.host;
      $.post(`${host}/users/password`,{email: get(this,"email")})
      .success(()=>{
	// Do something to notify the user of the positive result
	// get(this,"notifier").info("You should receive an email with password reset instructions shortly");
	this.transitionToRoute("login");
      })
      .error(()=>{
	// Do something to notify the user of the error
	// get(this,"notifier").info("An error occurred!");
      });
    }
  }
});
