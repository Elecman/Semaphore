<template>
    <div class="main">
        <div id="traffic-light">
            <div class="light red" :class="{active: current=='red', blink: current=='red' && count <= 3}">
                {{current=='red' && count > 0 ? count : ''}}
            </div>
            <div class="light yellow" :class="{active: current=='yellow', blink: current=='yellow' && count <= 3}">
                {{current=='yellow' && count > 0 ? count : ''}}
            </div>
            <div class="light green" :class="{active: current=='green', blink: current=='green' && count <= 3}">
                {{current=='green' && count > 0 ? count : ''}}
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import {State, Controller} from "./components/SemaphoreController";

    export default {
        /**
         *
         * @returns {{current: string, controller: Controller, count: number, intervalId: null, states: {}}}
         */
        data: () => ({
            current: 'red',
            controller: new Controller(),
            states: {},
            count: 0,
            intervalId: null,
        }),
        mounted() {
            /**
             *
             * @type {{red: State, yellowG: State, green: State, yellowR: State}}
             */
            this.states = {
                red: new State('red', 10),
                yellowR: new State('yellow', 3),
                yellowG: new State('yellow', 3),
                green: new State('green', 15)
            };
            //console.log(this);
            this.states.red.next = this.states.yellowR;
            this.states.yellowR.next = this.states.green;
            this.states.green.next = this.states.yellowG;
            this.states.yellowG.next = this.states.red;
            let {meta: {color}} = this.$route;
            this.startSemaphore(color);
        },
        watch: {
            $route(to) {
                let {meta: {color}} = to;
                this.startSemaphore(color);
            }
        },
        methods: {
            startSemaphore(color) {
                color = color ? color : 'red';
                this.controller.stopTrigger();
                this.controller.trigger(this.states[color === 'yellow' ? 'yellowR' : color], (state) => {
                    this.current = state.name;
                    this.count = state.dur;
                    this.startCounter();
                });
            },
            startCounter() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                this.intervalId = setInterval(() => {
                    this.count--;
                }, 1000)
            }
        }
    }
</script>

<style>
    body {
        background: #fefefe; /* fallback for old browsers */
        height: 100vh;
    }

    #traffic-light {
        width: 70px;
        height: 240px;
        background: #222;
        border-radius: 8px;
        margin: auto;
        padding: 15px;
    }

    .light {
        color: #000;
        text-align: center;
        font-size: 42px;
        line-height: 70px;
        display: inline-block;
        border-radius: 100%;
        width: 70px;
        height: 70px;
        margin-bottom: 8px;
        opacity: 0.2;
        transition: opacity 0.2s
    }

    .active {
        opacity: 1;
    }

    .red {
        background: red;
    }

    .yellow {
        background: yellow;
    }

    .green {
        background: green;
    }

    .blink {
        animation-name: blinker;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(1.0,0,0,1.0);
        animation-duration: 1s;
        -webkit-animation-name: blinker;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: cubic-bezier(1.0,0,0,1.0);
        -webkit-animation-duration: 1;
    }

    @keyframes blinker {
        from { opacity: 1.0; }
        to { opacity: 0.0; }
    }

    @-webkit-keyframes blinker {
        from { opacity: 1.0; }
        to { opacity: 0.0; }
    }
</style>
