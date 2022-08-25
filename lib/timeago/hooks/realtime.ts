import { LocaleFunc, Opts, TimerPool } from "../types";

const TIMER_POOL: TimerPool = {};

const clear = (tid: number):void => {
    clearTimeout(tid);
    delete TIMER_POOL[tid];
};

const run = (node: HTMLElement, date: string, localFunc: LocaleFunc, opts: Opts): void => {
    
}

export const render = (nodes: HTMLElement | HTMLElement[] | NodeList, locale?: string, opts?:  Opts) => {
    const nodeList = Array.isArray(nodes) ? nodes : [nodes];
    nodeList.forEach((node) => {

    })
}