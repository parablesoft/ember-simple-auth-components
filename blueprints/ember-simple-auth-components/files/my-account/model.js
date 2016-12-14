import DS from 'ember-data';
import { equal,not, or } from 'ember-computed-decorators';
import { memberAction } from 'ember-api-actions';

const {attr} = DS;
const {get,computed} = Ember;

const ADMIN_ROLE = "Admin";
const DEALER_ROLE = "Dealer";
const ROUGH_CUTTER = "Rough Cutter";
const FINAL_CUTTER = "Final Cutter";
const ZIPPERER = "Zipperer";
const PACKAGER = "Packager";
const WELDER = "Welder";
const SHOP_MANAGER = "Shop Manager";


export default DS.Model.extend({

  role: attr("string"),
  @equal("role",ADMIN_ROLE) isAdmin,
  @equal("role",DEALER_ROLE) isDealer,
  @equal("role",ROUGH_CUTTER) isRoughCutter,
  @equal("role",FINAL_CUTTER) isFinalCutter,
  @equal("role",ZIPPERER) isZipperer,
  @equal("role",PACKAGER) isPackager,
  @equal("role",SHOP_MANAGER) isShopManager,
  @equal("role",WELDER) isWelder,
  @or("isRoughCutter","isFinalCutter","isZipperer","isWelder") isScreenUser,
  @or("isDealer","isAdmin") isNotShop,
  // @not("isNotShop") isShop
  hasWorkPending: memberAction({path: "has_work_pending", type: "get", urlType: "findAll"}),

});
