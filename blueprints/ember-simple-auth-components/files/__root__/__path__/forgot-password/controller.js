import Ember from 'ember';
import Config from 'ember-simple-auth-components/configuration';
import Notifyable from "ember-ui-helpers/mixins/notifyable";

const {$,get,Controller} = Ember;

export default Controller.extend(Notifyable,{
  actions:{
    resetPassword(){
      let host = Config.host;
      $.post(`${host}/users/password`,{email: get(this,"email")})
      .success(()=>{
	this.successMessage("You should receive an email with password reset instructions shortly");
	this.transitionToRoute("login");
      })
      .error(()=>{
	this.showErrorMessage("An error has occurred!");
      });
    }
  }
});
