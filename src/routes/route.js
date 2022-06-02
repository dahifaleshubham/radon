const express = require('express');
const externalModule = require('./logger.js')
const externalModule1 = require('../util/helper')
const externalModule2 = require('../validator/formatter')
const lodash = require('lodash');
const { union } = require('lodash');
const router = express.Router();

router.get('/test-me', function (req, res) {

    externalModule.welcome()
    res.send('welcome')
    //res.sent("Welcome to my application. I am <name> and a part of FunctionUp Thorium cohort")

});

router.get('/test-me2', function (req, res) {

    externalModule1.printDate()
    externalModule1.getCurrentMonth()
    externalModule1.getCohortData()

    res.send('My second ever api!')
});

router.get('/test-me3', function (req, res) {
    externalModule2.trimStr()
    externalModule2.lowercase()
    externalModule2.uppercase()
    res.send('My third api!')
});

router.get('/Hello', function (req, res) {
    const arr = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec']
    console.log(lodash.chunk(arr ,3))
    res.send('chunk function api!')
});

router.get('/Hello2', function (req, res) {
    const arr2 =  [1,3,5,7,9,11,13,15,17,19]
    console.log(lodash.tail(arr2))
    res.send('tail function api!')
});

router.get('/Hello3', function (req, res) {
    const arr3 = [1,2]
    const arr4 = [2,3]
    const arr5 = [3,4]
    const arr6 = [4,5]
    const arr7 = [5,6]
    console.log(union)
    console.log(lodash.union(arr3,arr4,arr5,arr6,arr7))
    res.send('union function api')
});

router.get('/Hello4', function (req, res) {
    const list = [['One',1],['Two', 2],['Three',3 ],['Four',4]]

    const result = lodash.fromPairs(list)
    console.log(result)

    res.send('fromPairs function api')
});





module.exports = router;
// adding this comment for no reason