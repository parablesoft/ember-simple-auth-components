import DS from 'ember-data';

const {attr,Model} = DS;
const {get,computed} = Ember;
const {equal} = computed;

//Add role constants here
// const ADMIN_ROLE = "Admin";

export default Model.extend({

  role: attr("string"),
  // isAdmin: equal("role",ADMIN_ROLE)

});
