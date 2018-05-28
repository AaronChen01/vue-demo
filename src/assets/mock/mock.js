import axios from 'axios'

var eastTemp = []
var westTemp = []
var eastMile = []
var westTemp = []

function mockData() {
    axios.get('./res.json').then(res => {
        console.log(res);
    })
}
function getEastTemp(data) {
    for(let i = 1;i < 381;i++){
        eastTemp.push(data[i]["temperature"]);
        eastMile.push(data[i]["Mile"]);
    }
}
function getWestTemp(data) {

}
function getEastMile(data) {

}
function getWestMile(data) {

}
export default {
    mockData
}
