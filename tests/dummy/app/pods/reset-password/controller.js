import Ember from 'ember';
import Config from "dummy/config/environment";
import Notifyable from "ember-ui-helpers/mixins/notifyable";

const {$,get,Controller} = Ember;
const {alias} = Ember.computed;

export default Controller.extend(Notifyable,{
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
	    this.showErrorMessage("Sorry an error occurred while trying to change your password. Please make sure it's at least 8 characters then try again.", true);
	    return;
	  }
	  this.successMessage("Your password has been changed. You can now login with your new password.");
	  this.transitionToRoute("login");
	})
	.error(()=>{
	  this.showErrorMessage("Oops! An error has occurred and your password could not be changed. Please try again. Contact technical support if this problem continues.",true);
	})
    }
  },

});
