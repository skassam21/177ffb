const fs = require("fs");
const simpleGit = require("simple-git");

const watch = () => {
  const git = simpleGit();

  fs.watch("./src", (eventType: string, fileName: string) => {
    console.log(`File Changed, ${eventType}, ${fileName}`);
    git.add(`src/${fileName}`);
    git.commit(`[hatchways-commit] - ${eventType} src/${fileName}`);
    git.push();
  });
};

export default watch;
