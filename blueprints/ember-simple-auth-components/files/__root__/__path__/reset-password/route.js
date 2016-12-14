import Ember from 'ember';
import Config from "<%=dasherizedPackageName%>/config/environment";
import Notifyable from "ember-ui-helpers/mixins/notifyable";

const {$,get,Route} = Ember;

export default Route.extend(Notifyable,{
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
  backToLoginPage(){
    this.transitionTo("login");
  }
});
