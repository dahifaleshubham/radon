const str = " FUNCTIONUP "
const str2 = " radon "

const trimStr = function(){
    console.log("Module:3")
    console.log(str.trim());


}
const lowercase = function(){
   console.log(str.toLowerCase())

}
const uppercase = function(){
    console.log(str2.toUpperCase())

}

module.exports.trimStr = trimStr
module.exports.lowercase = lowercase
module.exports.uppercase = uppercase
