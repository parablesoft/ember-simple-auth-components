import Ember from 'ember';
import Config from "<%=dasherizedPackageName%>/config/environment";

const {$,get,Route} = Ember;
const {service} = Ember.inject;

export default Route.extend({
	// notifier: service(),
	model(params){
		let token = params.token;
		let host = Config.APP.host;
		return $.get(`${host}/users/password/edit?token=${token}`)
		.success((result)=>{
			if(!result.valid){
				this.showErrorMessage("We're sorry, but the link you used was not valid. If you need to reset your password, please click the link below and enter your email.");
				this.backToLoginPage();
				return false;
			}
			return result;
		})
		.error(()=>{
			this.showErrorMessage("Oops. Something went wrong. Please try again!");
			this.backToLoginPage();
		});
	},
	showErrorMessage(message){
		//
		// Implement some code here to show a message to the user.
		//
	
		// let notifier = get(this,"notifier");
		// notifier.alert(message);
	},
	backToLoginPage(){
			this.transitionTo("login");
	}
});
