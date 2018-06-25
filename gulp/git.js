import {exec} from "child_process";
import _ from "lodash";
import fs from "fs";
import path from "path";
import gulp from 'gulp';
import repos from "../repos.json";

gulp.task("git:clone", done => {
  _.map(repos, (data, name) => {
    const dest = path.join("repos", name);

    if (fs.existsSync(dest)) {
      console.log(`info: ${dest} already cloned`);
    } else {
      console.log(`cloning....${data.githubURL}`);
      if (!data.branch){
        exec(`git clone ${data.githubURL} ${dest}`);
      } else {
        exec(`git clone -b ${data.branch} ${data.githubURL} ${dest}`);
      }
    }
  });
  done();
});
