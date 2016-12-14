import ApplicationAdapter from '../application/adapter';

const {get} = Ember;
export default ApplicationAdapter.extend({
	urlForFindAll(){
		return get(this,"host") +  "/api/v1/my_account";
	},
	urlForUpdateRecord(){
		return get(this,"host") +  "/api/v1/my_account";
	}
});
