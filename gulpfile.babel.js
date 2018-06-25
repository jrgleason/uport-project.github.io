import minimist from 'minimist';

import "./gulp/git";
import "./gulp/watch";
import "./gulp/copy";


(()=>{
  const argv = minimist(process.argv.slice(2));
  if (argv.pathPrefix && argv.pathPrefix[0] !== '/') {
    throw new Error('The --pathPrefix argument must start with a "/"');
  }
})();