import fs from 'fs-extra';
import {join} from 'path';
const loadSqlQueries = async folderName => {
     const filePath = join(process.cwd(), 'src', folderName);
     const files = await fs.readdir(filePath);
     const sqlFiles = files.filter(f => f.endsWith(".sql"));
     const queries = {};
     for(const sqlFile of sqlFiles){
          const query = fs.readFileSync( join(filePath, sqlFile), {encoding: 'utf-8'});
          queries[sqlFile.replace(".sql", "")] = query;
     }
     return queries
}
export default loadSqlQueries;