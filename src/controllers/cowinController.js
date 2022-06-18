let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
const getVaccinationSession = async function(req, res) {
    try{
        let district = req.query.district_id
        let date = req.query.date
        var options = {
            method: "get",
            url:`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
            
        }
        let result = await axios(options) 
        let data= result.data
        res.status(200).send({msg : data})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
  
}
 

let londonTemp = async function (req, res) {
    try{
        let options = {
            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=83b0cc31420f1f1bf07823ef6d3eeedc`
        }
        let result = await axios(options) 
        let data= result.data.main.temp
        res.status(200).send({msg:"London Temperature is :", temp:data})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



let getSortedCities = async function (req, res) {
    try{
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray = []

        for (let i = 0; i<cities.length;i++ ) {
            let obj = {city : cities[i]} 
            let options = {
                method: 'get',
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=83b0cc31420f1f1bf07823ef6d3eeedc`
            }
            let result = await axios(options)
            obj.temp = result.data.main.temp
            cityObjArray.push(obj)
        }
        let sorted = cityObjArray.sort(function (a,b){return a.temp - b.temp })
        res.status(200).send({data : sorted})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let allMemes = async function (req, res) {
    try{
        let options = {
            method: "get",
            url: `https://api.imgflip.com/get_memes`
        }
        let result = await axios(options) 
        let data= result.data
        res.status(200).send({msg : data})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let createMemes = async function (req, res) {
    try{
        let template_id = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        let username = req.query.username
        let password = req.query.password
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=181913649&text0=Crazy&text1=happy&username=chewie12345&password=meme@123`
        }
        let result = await axios(options) 
        let data= result.data
        res.status(200).send({msg : data})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
} 


module.exports.allMemes = allMemes  
module.exports.createMemes = createMemes 



















module.exports.londonTemp = londonTemp 
module.exports.getSortedCities = getSortedCities 



module.exports.getVaccinationSession= getVaccinationSession

module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp