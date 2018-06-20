import {exec} from "child_process";
import _ from "lodash";
import fs from "fs";
import path from "path";
import gulp from 'gulp';
import log from 'fancy-log';

const repos = require("../repos");

gulp.task("git:clone", () => {
  _.map(repos, (data, name) => {
    const dest = path.join("repos", name);

    if (fs.existsSync(dest)) {
      log(`info: ${dest} already cloned`);
    } else {
      log(`cloning....${data.githubURL}`);
      if (!data.branch){
        exec(`git clone ${data.githubURL} ${dest}`);
      } else {
        exec(`git clone -b ${data.branch} ${data.githubURL} ${dest}`);
      }
    }
  });
});
