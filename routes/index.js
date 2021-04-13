
const express = require ("express"),
    funs = require ('../functions'),
    router = express.Router();

const {initialElements} = funs;

router.get("/",(req,res) => {

    const elements = [...initialElements];

    const meta = funs.meta({
        description: "",
        keywords:"top 10 best sellers, where to keep books",
    },req)

    res.render("homepage",{
        title: "Book-keeper™ |  Home",
        meta,
        elements,
        path:funs.pathToTheRoot(req._parsedUrl.path),

    })
});


module.exports = router;
