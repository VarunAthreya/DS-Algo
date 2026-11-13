/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
    const dirs = path.split("/");
    if (dirs[dirs.length - 1] === "") dirs.pop();

    let res = "";
    let backCnt = 0;

    // Walk right to left; a pending ".." cancels the next real directory.
    for (let i = dirs.length - 1; i >= 0; i--) {
        const dir = dirs[i];

        if (dir === "") continue;
        else if (dir === "..") backCnt++;
        else if (dir === ".") continue;
        else if (backCnt > 0) backCnt--;
        else res = `/${dir}` + res;
    }

    return res === "" ? "/" : res;
};
