import Ember from 'ember';
import LogoutControllerMixin from 'ember-simple-auth-components/mixins/logout-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | logout controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let LogoutControllerObject = Ember.Object.extend(LogoutControllerMixin);
  let subject = LogoutControllerObject.create();
  assert.ok(subject);
});
