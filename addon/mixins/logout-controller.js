import Ember from 'ember';

const {Mixin,get,set,inject} = Ember;
const {service} = inject;
export default Mixin.create({
  session: service(),
  actions:{
    logout(){
      set(this,"isLoggingOut",true);
      get(this,'session').invalidate();
      this.transitionToRoute("login");
    }
  }
});
