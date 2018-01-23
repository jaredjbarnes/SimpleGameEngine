/*************************************************************
*                        Build File                          *
**************************************************************
The purpose of this file is to dynamically create a build 
system off of the tasks.json file needed with vscode. This 
allows us to maintain just one place for constructing our 
tasks. 
**************************************************************/

const fs = require("fs-extra");
const exec = require("child-process-es6-promise").exec;
const path = require("path");
const workspaceRoot = path.resolve(__dirname, "./../");

const removeWorkspaceRoot = (value) => {
    return value.replace("${workspaceRoot}", workspaceRoot);
}

fs.readJson(path.join(workspaceRoot, ".vscode/tasks.json")).catch(() => {
    console.log("Couldn't find tasks.json in .vscode folder.");
}).then((tasksConfig) => {
    if (tasksConfig && tasksConfig.tasks) {
        return tasksConfig.tasks.filter((task) => {
            return task.taskName !== "build";
        }).reduce((promise, task) => {

            var command = "node " + task.args.map((value) => {
                return removeWorkspaceRoot(value);
            }).join(" ");

            return promise.then(() => {
                return exec(command, { cwd: workspaceRoot }).catch((error) => {
                    console.log(`Failed to build project because of task: ${task.taskName}`);
                    throw error;
                });
            });

        }, Promise.resolve(undefined));
    }
}).then(() => {
    console.log("Build complete.");
}).catch(()=>{
    console.log("Build failed.");
});