import Observer from "./Observer";

export default function observe(obj) {
    if (typeof obj !== 'object') return;
    let ob;
    if (typeof obj.__ob__ !== 'undefined') {
        ob = obj.__ob__;
    } else {
        ob = new Observer(obj);
    }
    return ob;
}