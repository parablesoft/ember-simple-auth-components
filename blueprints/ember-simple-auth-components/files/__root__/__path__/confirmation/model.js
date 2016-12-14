import DS from 'ember-data';

const {attr,Model} = DS;
export default Model.extend({
  firstName: attr("string"),
  email: attr("string"),
  password: attr("string")
});
