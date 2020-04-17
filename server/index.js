var Mock = require('mockjs');
var fs = require('fs');


var mockData = Mock.mock({
    "data|30": [{
        "id|+1": 1,
        "pid": /\d{8}/,
        "pname": "@cname",
        "type" : "@string(国家社会,2)",
        "subject": "@string(理科工科,2)",
        "money|10000-999999": 0,
        "start": "@date",
        "end": "@date",
        "check": "@string(同意不同意,2)",
        "suggest": "@string(同意不同意,2)",
        "rate|1-10": 0,
    }]
})

var academic = Mock.mock({
    "data|30": [{
        "id|+1": 1,
        "title": "@cword(4)",
        "time": "@date",
        "user": "@cname",
        "unit": "@csentence(4)",
        "check": "@string(同意不同意,2)",
        "suggest": "@string(同意不同意,2)",
    }]
})


fs.writeFile("./resources/data/manage.json",JSON.stringify(mockData.data),(err)=>{
    if(!err) console.log('success')
})

fs.writeFile("./resources/data/academic.json",JSON.stringify(academic.data),(err)=>{
    if(!err) console.log('success')
})