import fs from 'fs';
import log from 'fancy-log';

// safeSymlink synchronously creates a symlink to src if there is no existing
// file or symlink at dest
module.exports = function exportFunc(src, dest) {
  try {
    fs.lstatSync(dest);
  } catch(e) {
    log(`*************: ${src} *****************  ${dest}`);
    fs.symlinkSync(src,dest);
  }
};
