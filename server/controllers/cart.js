module.exports.logout = async (req, res) => {
    //WHY DOES THIS LOGOUT ROUTE NOT HIT
    console.log("logout route hit");
    res.clearCookie("_random_cookie_name", {
        path: "/",
        domain: ".awesomedomain.co",
    });
    res.clearCookie("userId").send();
};
