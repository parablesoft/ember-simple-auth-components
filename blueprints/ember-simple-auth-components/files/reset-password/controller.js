import Ember from 'ember';
import Config from "<%=dasherizedPackageName%>/config/environment";

const {$,get,Controller} = Ember;
const {alias} = Ember.computed;
const {service} = Ember.inject;

export default Controller.extend({
	// notifier: service(),
	token: alias("model.token"),
	actions:{
	  resetPassword(){
			let host = Config.APP.host;
			let data = {reset_password_token: get(this,"token"), password: get(this,"password")};
			$.ajax({
				url: `${host}/users/password/`,
				data: data,
				type: "PUT"})
				.success((result)=>{
					if(!result.success){
						this.showMessage("Sorry an error occurred while trying to change your password. Please make sure it's at least 8 characters then try again.", true);
						return;
					}
					this.showMessage("Your password has been changed. You can now login with your new password.");
					this.transitionToRoute("login");
				})
				.error(()=>{
					this.showMessage("Oops! An error has occurred and your password could not be changed. Please try again. Contact technical support if this problem continues.",true);
				})
	  }
	},
	showMessage(message,isErrorMessage){
		//
		// Implement some code here to show a message to the user.
		//
		
		// let notifier = get(this,"notifier");
		// if(isErrorMessage){
		// 	notifier.alert(message);
		// }
		// else{
		// 	notifier.info(message);
		// }
	}

});
