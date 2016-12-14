import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import config from '<%=dasherizedPackageName%>/config/environment';
const {get,computed} = Ember;
export default DeviseAuthenticator.extend({
  host: config.APP.host,
  serverTokenEndpoint: computed(function(){
    let host = get(this,"host");
    return `${host}/users/sign_in`;
  })
});

