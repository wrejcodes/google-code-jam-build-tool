# Google Code Jam JavaScript Build Tool

## Description
This tool is meant to help aid in JavaScript problem solving for Google Code Jam. This tool will not solve any problems for you. However, it will aid in the following:
 - Starting on a new problem by having convenient commands for creating folders/files needed to solve that problem.
 - Save time testing your solution by having convenient execution commands
 - Allow you to write ES6+ JavaScript while testing locally and transpile that JavaScript code to Node 4.8.2 compatible JavaScript code for submitting.

*NOTE: This has been only tested on MacOS with node 10.13.0*

*If you run into issues using this tool feel free to open an issue but I might not get to it until after Code Jam has concluded for this year (2019)*

## To install this tool
- First make sure you have node >= 6.4 installed.

- Then, clone/download the repository:
`git clone https://github.com/wrejcodes/google-code-jam-build-tool`

- Then change directory to the repository:
`cd google-code-jam-build-tool`

- Install dependencies:
`npm install`

Have a look at the usage below for how to use this tool.

## Usage

- New
	- `npm run new -- questionName` will generate a project folder for the 'questionName'
	- If I run `npm run new -- foo` a folder named foo with the following structure will be created:
```
foo
 |_ dist
 |_ src
     |_ main.js
     |_ in.txt
     |_ out.txt
```

- Exec
	- `npm run exec -- questionName` will run the questionName code using in.txt for stdin and out.txt for stdout
	- running `npm run exec -- foo` will essentially run this command `node foo/src/main.js < foo/src/in.txt > foo/src/out.txt`
	- This allows you to copy/paste the sample input from the problem description into `foo/src/in.txt` and compare `foo/src/out.txt` with the sample output given in the problem description after running `npm run exec -- foo`.
- Build
	- `npm run build -- questionName` will use the gulpfile to generate transpiled, minified javascript targetting the node version used by Google Code Jam (currently 4.8.2)
	- `npm run build -- foo` will use `foo/src/main.js` to generate `foo/dist/main.min.js`
	- This task uses babel for transpilation so you can use ES6+ code for problem solving, but submit minified javascript targeting Google Code Jam's node version.
	- When submitting your solution, make sure you submit `foo/dist/main.min.js` and not `foo/src/main.js`

## Templates

The main.js.template file has some boilerplate code for solving codejam problems.
Feel free to edit this template to your specific needs.

Running the following commands:

```bash
npm run new -- foo
echo "1\nhello" > foo/src/in.txt
npm run exec -- foo
```

Should produce `Case #1: hello` in `foo/src/out.txt` with the current template.
