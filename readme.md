

### Mongo DB connectivity:
  # Mongo Atlas cloud connectivity:
    NB: 
      - Atlas connectivity is not available from the office network
      - If we are behind a VPN, Mongo Atlas cloud is not available as well

    - We can login to Atlas cloud instance through the Atlas portal under - https://cloud.mongodb.com/v2/62aac0b6c1155b461703b988#clusters
    - Check mongodb+srv scheme connectivity details from `src/db/connections/mongodb_conn.js`; the idea is to make this configurable later ...

  # Mongo local connectivity:
    A local 'globomantics' db has been created manually uinsg locally installed MongoDBCompass and the file sessions.json under ./src/data/sessions.json
    - Check mongodb scheme connectivity details from the same file above

  # Frequently Asked Question:
    Do I need to explicitely close connection to Mongo DB ?
    - No, we do not need to close connections to DB - your only connection is via MongoClient and as the documentation states - it handles connection pooling for you.
        Check following stackoverflow post 'https://stackoverflow.com/a/19949939'

  # Some handy npm commands:
  > npm list --depth 0 --> This will display 1st level of the installed dependency packages (NB: short form is ls)
  > npm list -g --depth 0 --parseable --> Displays globally installed npm packages and shows directory path of the installed packages (We can specify --long or --json instead of --parseable)
  > npm update --> Will install the latest versions that are cpompatible with the semantic versions in package.json
  > NB: If we need to specify specific versions in package.json, we would need to delete package-lock.json first otherwise we won't be able to install the specified versions with > npm install command
  > npm prune --prod --> Is a useful command to remove the dev-dependencies from the package.json when deploying to production. Removing the --prod flag will remove the orphen packages from node_modules if they are not listed in package.json
  > npm config list --> to enlist the config properties. > npm set or > npm get are short for > npm config set | get
  > npm repo --> will open the code repo, e.g. github, for the actual package on the a browser

  # Publishing own package to npm and to github repo:
  1. npm adduser --> this will add the npmjs user account, so that npm can authenticate when publishing own package. Got my npmjs account saved in vault
  2. git init --> This will create a local git repostory
  3. git remote add origin https://github.com/szairi2011/nodejs-webapp --> Associate te local repo with the remote repo that has been already created on github