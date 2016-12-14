import Ember from "ember";
import LogoutController from "ember-simple-auth-components/mixins/logout-controller";

const {Controller,inject} = Ember;
const {service} = inject;

export default Controller.extend(LogoutController,{
  session: service(),
  
});
