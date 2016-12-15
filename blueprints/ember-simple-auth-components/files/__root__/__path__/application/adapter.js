import DS from 'ember-data';
import Ember from "ember";
import Config from 'ember-simple-auth-components/configuration';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  authorizer: 'authorizer:devise',
  host: Config.host,
  namespace: "api/v1",
});
