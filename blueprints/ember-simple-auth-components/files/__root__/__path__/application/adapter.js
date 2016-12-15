import DS from 'ember-data';
import Ember from "ember";
import config from '<%=configPackageName%>/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  authorizer: 'authorizer:devise',
  host: config.APP.host,
  namespace: "api/v1",
});
