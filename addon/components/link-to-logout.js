import Ember from 'ember';
import layout from '../templates/components/link-to-logout';

export default Ember.Component.extend({
  layout,
  tagName: "",
  actions:{
    invalidateSession(){
      this.attrs.onInvalidateSession();
    }
  }

});
