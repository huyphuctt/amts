import { Button } from 'framework7-react';
import { Component } from 'react'
import { Modal } from "react-bootstrap";

class AbsConfirm extends Component {
    constructor(props) {
        super(props);
        const {
            options,
            escape,
        } = props;
        this.state = {
            options: options,
            escape: escape,
            __formData: {
                loaded: false,
            },
            __formId: new Date().getTime()
        };
    }

    modalBody() {
        const self = this;
        const {
            show,
            proceed,
        } = self.props;
        return <></>;
    }
    modalHeader() {
        const self = this;
        const {
            show,
            title,
            proceed,
        } = self.props;
        return <>
            <Modal.Title>{title}</Modal.Title></>;
    }
    modalFooter() {
        const self = this;
        const {
            show,
            escape,
            proceed,
        } = self.props;
        return <><Button
            className="button-l"
            onClick={() => proceed({ result: false })}>
            <i className="fa fa-save pr-2"></i>Save
        </Button></>;
    }
    render() {
        const self = this;
        const {
            show,
            escape,
            proceed,
        } = self.props;
        const { __formId } = self.state;
        var enableEscape = false;
        var modalCls = "modal-xl modal-fullscreen-xxl-down ";
        modalCls += " modal-dialog-centered modal-dialog-scrollable forms";
        return (
            <Modal
                className="unique-class"
                show={show}
                onHide={() => proceed({ result: false })}
                backdrop={escape ? true : "static"}
                keyboard={escape}
                dialogClassName={modalCls}>
                <Modal.Header>
                    {self.modalHeader()}
                </Modal.Header>
                <Modal.Body id={`select-container-${__formId}`}>
                    {self.modalBody()}
                </Modal.Body>
                <Modal.Footer>
                    {self.modalFooter()}
                </Modal.Footer>
            </Modal >
        );
    }
}
export default AbsConfirm;