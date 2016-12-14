import Ember from 'ember';
const {RSVP,set,get,Controller,computed} = Ember;
const {service,controller} = Ember.inject;
const {alias} = computed;


export default Controller.extend({

	application: controller(),
	// myAccount: service(),
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
				transition == null ? this.transitionToRoute("dashboard") : transition.retry();
			}).catch((reason) =>{
				this.set("application.isLoggingIn",false);
				this.set("errorMessage","Invalid username or password!");
				this.set("password","");
			});
		}
	}
});
