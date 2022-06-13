const mid1 = function (req, res, next) {

    // If the header **isFreeAppUser** is not present terminate the request response cycle
    // with an error message that the request is missing a mandatory header
        const getHeader = req.headers.isfreeappuser
        if (!getHeader) {
            return res.send ({status: false, msg: "request is missing a mandatory header"})
        } 
         next() 
    }
    
    module.exports.mid1 = mid1
    
