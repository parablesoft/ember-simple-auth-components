import Ember from 'ember';
import DS from 'ember-data';
import ESASession from "ember-simple-auth/services/session";

const {computed,set,get,inject,run} = Ember;
const {service} = inject;
const {PromiseObject} = DS;
const {cancel,later} = run;



export default ESASession.extend({
  store: service(),
  currentUser: computed("isAuthenticated",function(){
    let isAuthenticated = get(this,"isAuthenticated");
    if(isAuthenticated){
      const promise = get(this,"store").findAll("myAccount").then((data)=>{
	return data.objectAt(0);
      });
      return PromiseObject.create({ promise: promise })
    }
  }),
});
