
const express = require ("express"),
    funs = require ('../functions'),
    router = express.Router();

const {initialElements} = funs;

router.get("/",(req,res) => {

    const elements = [...initialElements,"../assets/lib/flickity/flickity.css","../assets/lib/flickity/flickity.pkgd.min.js","../assets/js/main.js"];

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

router.get("/bestsellers",(req,res) => {

    const elements = [...initialElements,"../assets/js/list.js","../assets/css/list.min.css"];

    const meta = funs.meta({
        description: "",
        keywords:"top 10 best sellers, where to keep books",
    },req)

    res.render("list",{
        title: "Book-keeper™ |  Best Sellers",
        meta,
        elements,
        path:funs.pathToTheRoot(req._parsedUrl.path),

    })
});

router.get("/signup",(req,res) => {

    const elements = [...initialElements,"../assets/js/list.js","../assets/css/list.min.css","../assets/css/login.min.css" ];

    const meta = funs.meta({
        description: "",
        keywords:"top 10 best sellers, where to keep books",
    },req)

    res.render("signup",{
        title: "Book-keeper™ | Login",
        meta,
        elements,
        path:funs.pathToTheRoot(req._parsedUrl.path),

    })
});








module.exports = router;
