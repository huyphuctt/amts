import React, { Component } from 'react'
import $ from "jquery"
class AbsComponent extends Component {
    constructor(props) {
        super(props);
        this.inputs = {};
        this.state = {
            __pageData: {
            },
            __pageDataLoaded: false
        }
        this.pageInit = this.pageInit.bind(this);
        this.pageBeforeIn = this.pageBeforeIn.bind(this);
        this.pageAfterIn = this.pageAfterIn.bind(this);
        this.pageBeforeOut = this.pageBeforeOut.bind(this);
        this.pageAfterOut = this.pageAfterOut.bind(this);
        this.pageReinit = this.pageReinit.bind(this);
        this.textChanged = this.textChanged.bind(this);
    }

    /****
     *
     * 1. render 
     * 2. componentDidMount
     * 3. pageInit
     * 4. pageBeforeIn
     * 5. pageAfterIn     
     * 6. pageBeforeOut
     * 7. pageAfterOut
     * 8. pageReinit
     * 9. render
     */
    render() {
        console.log('render');
    }
    componentDidMount() {
        console.log('componentDidMount');
    }
    pageInit(page) {
        console.log('pageInit');
    }
    pageBeforeIn(page) {
        console.log('pageBeforeIn');
    }
    pageAfterIn(page) {
        console.log('pageAfterIn');
    }
    pageBeforeOut(page) {
        console.log('pageBeforeOut');
    }
    pageAfterOut(page) {
        console.log('pageAfterOut');
    }
    pageReinit(page) {
        console.log('pageReinit');
    }

    //custom event 
    customSelectChanged(selected, name, container, index) {
        return false;
    }
    customHandleSwitch(checked, name, container, index) {
        return false;
    }
    customTextChanged(text, name, container, index) {
        return false;
    }

    customNumberChanged(value, name, container, idx) {
        return false;
    }

    //common event
    textChanged(e) {
        const self = this;
        var { __pageData } = self.state;
        if (e) {
            const self = this;
            const element = e.target;
            var name = element.name;
            var text = $(element).val();
            // var text = element.value();
            var idx = $(element).data('index');
            var container = $(element).data('container');
            if (!isNaN(idx) && idx > -1 && container) {
                if (Utils.isset(__pageData, container)) {
                    __pageData[container] = [];
                }
                container = __pageData[container];
            } else {
                container = __pageData;
            }
            if (self.customTextChanged(text, name, container, idx) == false) {
                container[name] = text;
            }
            self.setState({ __pageData: __pageData });
        }
    }
    numberChanged(text, name, values) {
        const self = this;
        var event = window.event;
        var element = event ? event.target : null;
        var max = element ? $(element).data('max') : null;
        var min = element ? $(element).data('min') : null;
        var { __formData } = self.state;
        var details = null;

        if (!Utils.isNotNull(text) || text.length === 0) {
            text = 0;
        } else {
            text = Number(text);
        }

        if (Utils.str_contains(name, '-')) {
            var name_idx = Utils.explode('-', name);
            name = name_idx[0];
            var idx = name_idx[1];
            if (idx > -1) {
                details = __formData.details[idx];
            } else {
                details = __formData;
            }
        } else {
            details = __formData;
        }

        if (Utils.isNotNull(max)) {
            if (Utils.floatval(text) > max) {
                text = max;
            }
        }
        if (Utils.isNotNull(min)) {
            if (Utils.floatval(text) < min) {
                text = min;
            }
        }
        if (!self.customNumberChanged(text, name, details, idx)) {
            if (details) {
                details[name] = text;
            }
        }
        self.setState({ __formData: __formData });
    }
    radioChanged(e) {
        const self = this;
        var { __formData } = self.state;
        const element = e.target;
        var text = $(`input:radio[name ='${element.name}']:checked`).val();
        var idx = $(element).data('item');
        if (idx > -1) {
            __formData.details[idx][element.name] = text;
        } else {
            __formData[element.name] = text;
        }
        self.setState({ __formData: __formData });
    }
    handleSwitch(name, checked) {
        const self = this;
        var { __formData } = self.state;
        __formData[name] = checked;
        self.customHandleSwitch(name, checked);
        self.setState({ __formData: __formData });
    }
    selectChanged(selected, actionMeta) {
        const self = this;
        var { __formData } = self.state;
        var name = actionMeta.name;
        if (Utils.str_contains(name, '-')) {
            var name_idx = Utils.explode('-', name);
            name = name_idx[0];
            var idx = name_idx[1];
            if (!self.customSelectChanged(selected, name, __formData.details[idx])) {
                __formData.details[idx][name] = selected;
            }
        } else {
            if (!self.customSelectChanged(selected, name, __formData)) {
                __formData[name] = selected;
            }
        }
        self.setState({ __formData: __formData });
    }
    fileChanged(event) {
        const self = this;
        var { __formData } = self.state;
        var name = event.target.name;
        if (!Utils.isset(__formData, 'files')) {
            __formData['files'] = {};
        }
        if (event.target.files.length > 0) {
            if (!Utils.isset(__formData['files'], name)) {
                __formData['files'][name] = [];
            }
            __formData['files'][name].push(event.target.files[0]);
        }
        self.setState({ __formData: __formData });
    };
}
export default AbsComponent;