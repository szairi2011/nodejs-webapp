

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

## Pluralsight material :: Course :: "Working with NPM 4"
  # Some handy npm commands:
  - > npm list --depth 0 --> This will display 1st level of the installed dependency packages (NB: short form is ls)
  - > npm list -g --depth 0 --parseable --> Displays globally installed npm packages and shows directory path of the installed packages (We can specify --long or --json instead of --parseable)
  - > npm update --> Will install the latest versions that are cpompatible with the semantic versions in package.json
  - > NB: If we need to specify specific versions in package.json, we would need to delete package-lock.json first otherwise we won't be able to install the specified versions with > npm install command
  - > npm prune --prod --> Is a useful command to remove the dev-dependencies from the package.json when deploying to production. Removing the --prod flag will instead remove the orphen packages from node_modules if they are not listed in package.json; this will keep our node_modules clean and in line with the package.json manifest. Hint: This command could be run for instance when building a prod Docker image where no dev tools will be required afterwards.
  - > npm config list --> to enlist the config properties. > npm set or > npm get are short for > npm config set | get
  - > npm repo --> will open the code repo, e.g. github, for the actual package on the a browser

  # Publishing own package to npm and to github repo:
  1. npm adduser --> this will add the npmjs user account, so that npm can authenticate when publishing own package. Got my npmjs account saved in vault
  2. git init --> This will create a local git repostory
  3. git remote add origin https://github.com/szairi2011/nodejs-webapp --> Associate te local repo with the remote repo that has been already created on github
  4. npm init --> This will create the package with suitable properties
  5. git add .
  6. git commit -m "First checking ..."
  7. git push --set-upstream origin master
  8. npm publish --> This will publish the package to npmjs so that users can install with > npm install nodejs-wabapp. Once published , we can do > npm info nodejs-webapp or > npm repo. We can also browse to the package site directly without going through npmjs https://npm.im/nodejs-webapp
  9. git tag 1.0.1 --> NB: It makes lots of sense to tag versions in github for each published release in npmjs
  10. git push --tags --> This will add the version tag and will upload the associated codebase artifacts to github repo

  # Publishing an update for the package:
  1. git add .
  2. git commit -m "..."
  3. npm version patch --> Instead of going to package.json, this will automatically increment the semantic version for us in this case it will update the patch part. we can specify minor or major instead of minor depends on the nature of the changes that are made
  4. NB: No need to tag a new version of the modified package for git; npm has already done that for us check > git tag, and we can see it's already created for us
  5. npm publish
  6. git push --tags --> Tag the new release in github with the associated codebase 
  7. git push --> Push to the remote branch in this case master

  # Release a Beta | alpha | pre-release version for the package:
  1. Amend package.json version to the actual beta release, e.g. 1.1.0-beta.0. npm does not support automatic version change of tagged releases
  2. npm publish --tag beta --> Will create a tagged beta version of the package in npm. This will help users identifying the experimental nature of the release,  and they can download it if they wish to try some features
  3. git add .
  4. git commit -m "..."
  5. git tag 1.1.0-beta.0 --> Create the same tagged version of the beta release for git
  6. git push
  7. git push --tags
  - Users who wish to install the "beta" tagged release package can just run > npm i nodejs-webapp@beta
  - npm info will display an additional tag, i.e. beta to the dist-tags alongside latest tag

  ## Pluralsight material :: Course :: "Eliminating Security vulnerabilities with NPM 6 Audit"
  # Identify vulnerabilities:
  NPM offers a way to identify and/or fix security vulnerabilities in the dependency packages with the audit command:
  - > npm audit --> Will print all identified vulnerabilities in dependency modules as per community reported issues, and know patterns. NB: npm audit will not identify security vulnerabilities in our own project code; there are other npm tools that could do that for us
  - > npm audit | awk '/High/ {print $0}' --> This works on Linux and we need to get familiar to print the level of detail we need; in this we only print High reported vulnerabilities
  - > npm audit --json > file_to_be_processed.json --> THis would be handy to use visualization tools that could parse the json file and show case vulnerabilities using build in filters such number of high or critical ones, etc
  - > npm audit --dev | --prod --> --dev flag will display only dev-dependencies based vulnerabilities, and --prod will only report the actual dependencies of the project. This could be a very handy feature, when combined with npm prune --prod command, to keep only the prod packages in a customer facing deployment and fix only the prod related vulnerabilities for the project

  # Fix identified vulnerabilities using npm:
  - > npm audit fix --> This will fix the promised fixable issues by updating package.json, package-lock.json, remove vulnebale modules, and install the safe ones all of that in one command
  - > npm audit fix --only=dev | prod --> This will only fix dev-dependencies or prod relatd vulnerabilities
  - > npm audit fix --force -->  This will allow npm to bypass the semver compatibility while fixing vulnerabilities, so that we don't have to install sepecific version manually, and instead let npm decide what the best fix guess for us. 

  # Fix identified vulnerabilities manually:
  - At some point if the project is a bit complex in term of dependencies, and after going through > npm audi fix, npm audit may instruct us to perform manual fixing. In this case, deleting package-lock.json (and perhaps > rm -rf node_modules) and reinstall with > npm install may download newer packages while honoring package.json semver definitions and this could fix many vulnerabilities especially for those projects that did not undergo upgrades for a while ...
  - With the help of > npm audit to identify vulnerable packages and > npm info <name_of_vulnerable_packege> to identify the latest version, we may update package.json manually and then reinstall again
  - If the latest version are only for minor or patch versions, we may add ^ to the version, e.g. ^4.8.0, and that will allow npm to install the latest non breaking versions (Only valid if the owners of the packages are following the semver conventions)
  - We can also report issues and vulnerabilities on github repo of the actual package dependency; hoping that they will be addressed by the owner at some point
  - Alternatively we can also fork the project from github, we then fix the issues locally, and send a pull request (PR) to the owner/maintainers of the project and let them decide if they wish to accept the fixes we have made
  - But if filing an issue or sending a PR is not going to help (e.g. if the project is not going to be maintained anymore), then we may need to fork and publish a fixed version ourselves instead
  - An easier alternative is to look for a different package that provides similar features that is vulnerabilities free and that is still maintained ...

