let fs = require('fs');
let fse = require('fs-extra');
let path = require('path');
let EOL = require('os').EOL;
const environmentJsRegExFunction = /(\s*function\(.+\) \{[\s\S]+)(\sreturn ENV)/m;
const routerJsRegExFunction = /(Router\.map\(\s*function\(\) \{[\s\S]*)(\n^\})/m; 
const routerJsRegExPattern = "$1" + EOL + "  this.route('login');" + EOL +
  "  this.route('my-account',function(){" + EOL + 
  "   this.route('change_password');" + EOL + 
  "  });" + EOL + 
    "  this.route('forgot_password');" + EOL + 
      "  this.route('reset_password', {path: 'reset_password/:token'});" + EOL + 
	"  this.route('users',function(){" + EOL + 
	  "    this.route('confirmation', {path: 'confirmation/:token_id'});" + EOL + 
	    "  });" + EOL +
	      "$2"
const environmentJsRegExPattern = "$1" + EOL + 
				  "  ENV['ember-simple-auth'] = { " + EOL + 
				    "    authenticationRoute: 'login',  " + EOL + 
				      "    authorizer: 'simple-auth-authorizer:devise'," + EOL + 
					"    routeAfterAuthentication: 'dashboard'," + EOL + 
					  "    routeIfAlreadyAuthenticated: 'dashboard'," + EOL + 
					    "    crossOriginWhitelist: [ENV.APP.host]," + EOL + 
					      "  };" + EOL + 
						"  ENV['simple-auth-devise'] = { " + EOL + 
						  "    serverTokenEndpoint : ENV.APP.host + '/users/sign_in'" + EOL + 
						    "   };" + EOL + 
						      "$2"
/*jshint node:true*/
module.exports = {
  description: '',
  normalizeEntityName: function() {},
  afterInstall: function(options) {
    let args = {dummy: options.dummy, root: options.project.root};
    updateEnvironmentJs(args);
    updateRouter(args);
    this.addAddonToProject("ember-bootstrap","");
    this.addAddonToProject("ember-font-awesome","");
    this.addAddonToProject("ember-simple-auth","");
    return this.addAddonToProject('ember-ui-helpers', '');
  },
  fileMapTokens: function () {
    return {
      __rootdir__: function (options) {
	if (options.inDummy) {
	  return path.join('tests', 'dummy')
	}
	return '/'
      },
      // overriding to always returning module name despite being a pod
      __path__: function (options) {
	return "pods";
	// return options.pod ? options.podPath : "";
      }
    }
  }
};

function updateEnvironmentJs(options){
  let filePath = buildFilePath(options,"config","environment.js");
  updateEnvironmentJsContent(filePath);
}

function updateRouter(options){
  let filePath = buildFilePath(options,"app","router.js");
  updateRouterJsContent(filePath);
  
}

function updateEnvironmentJsContent(configPath){
  return writeContentToFile(configPath,environmentJsRegExFunction,environmentJsRegExPattern);
}

function updateRouterJsContent(configPath){
  return writeContentToFile(configPath,routerJsRegExFunction,routerJsRegExPattern);
}

function buildFilePath(options,...filePath){
  let rootPath = options.root;
  if(options.dummy){rootPath = path.join(rootPath,"tests","dummy");}
  return path.join(rootPath,...filePath);
}
function readFile(configPath){
  return fse.readFileSync(configPath,'utf-8');
}
function writeContentToFile(configPath,replacementFunction,replacementPattern){
  let currentContent = readFile(configPath);
  let newContent = currentContent.replace(replacementFunction,replacementPattern);
  fse.writeFileSync(configPath,newContent);
  return true;
}
