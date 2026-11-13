/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
    const stack = [];

    for (const dir of path.split("/")) {
        if (dir === "" || dir === ".") continue;
        else if (dir === "..") stack.pop();
        else stack.push(dir);
    }

    return "/" + stack.join("/");
};
