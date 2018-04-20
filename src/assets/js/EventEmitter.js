import EventEmitter from 'events' //= require('events');

class MyEmitter extends EventEmitter {}

const myEvent = new MyEmitter();

// export default {
//     myEvent
// }
export {
    myEvent
}
