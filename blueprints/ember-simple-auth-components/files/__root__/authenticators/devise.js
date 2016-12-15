import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Config from "ember-simple-auth/configuration";

const {get,computed} = Ember;
export default DeviseAuthenticator.extend({
  host: Config.host,
  serverTokenEndpoint: computed(function(){
    let host = get(this,"host");
    return `${host}/users/sign_in`;
  })
});

