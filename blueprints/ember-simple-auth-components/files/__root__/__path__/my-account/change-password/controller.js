import Ember from "ember";
import Notifyable from "ember-ui-helpers/mixins/notifyable";
const {Controller} = Ember;
export default Controller.extend(Notifyable,{
  actions:{
    changePassword(){

      let {currentPassword,newPassword} = this.getProperties("currentPassword","newPassword");
      let data = {current_password: currentPassword, new_password: newPassword};

      $.ajax({
	url: url,
	type: "POST",
	data: data,
      })
      .success((result) =>{
	this.setProperties({currentPassword: "", newPassword: ""});
	let valid = result.old_password_valid;
	let passwordChanged = result.password_changed;
	if(valid && passwordChanged){
	  this.info("Your password has been changed.");
	  $("#current-password").focus();
	  return;
	}
	if(!valid){
	  this.alert("The current password that you entered is not valid.");
	  return;
	}
	if(!passwordChanged){
	  this.alert("The new password you entered is not valid. Please make sure it's at least at characters long.");
	  return;
	}
      },
      ()=>{
	this.setProperties({currentPassword: "", newPassword: ""});
      });
    }
  }  
});
