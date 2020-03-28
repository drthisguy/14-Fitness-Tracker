const path = require("path");

module.exports = function(router) {

    // start page
    router.get("/", (req, res) => {
    
        res.sendFile(path.join(__dirname, "../public/index.html"));

});

    // exercise page
    router.get("/exercise", (req, res) => {
    
        res.sendFile(path.join(__dirname, "../public/exercise.html"));

});

    // stats page
    router.get("/stats", (req, res) => {
    
        res.sendFile(path.join(__dirname, "../public/stats.html"));

});
    
}