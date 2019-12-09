import * as fs from 'fs';
const path = __dirname + '/../public/users';
export const usersSeed: Array<{
  name: string;
  images: Array<any>;
}> = (fs.readdirSync(path, { withFileTypes: true }) as fs.Dirent[])
  // get directories only
  .filter(dirent => dirent.isDirectory())
  .map((dirent: fs.Dirent) => {
    // Read files from each directory
    const files = fs
      .readdirSync(path + '/' + dirent.name, { withFileTypes: true })
      .map(d => `${dirent.name}/${d.name}`);
    return { name: dirent.name, images: files };
  });
console.log(usersSeed);
