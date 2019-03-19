export class State {
    /**
     *
     * @param name цвет
     * @param dur время преключения
     * @param next следующий цвет включения
     */
    constructor(name, dur, next){
        this.name = name;
        this.dur = dur;
        this.next = next;
    }
}

export class Controller {
    /**
     *
     * @param state
     * @param callback
     */
    timerId = null;
    trigger(state, callback){
        callback(state);
        this.timerId = setTimeout(()=>{
            this.trigger(state.next, callback);
        }, state.dur * 1000)
    }
    stopTrigger() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
}