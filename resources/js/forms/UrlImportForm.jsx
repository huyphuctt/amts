import { Button, Col } from "framework7-react";
import { Modal, Row } from "react-bootstrap";
import { confirmable, createConfirmation } from "react-confirm";
import AbsConfirm from "../components/AbsConfirm";
class UrlImportForm extends AbsConfirm {
    modalBody() {
        const self = this;
        const {
            show,
            proceed,
        } = self.props;
        return <>
            <Row>
                <Col lg={6}> Col 1-1</Col>
                <Col lg={6}> Col 1-2</Col>
            </Row>
            <Row>
                <Col lg={4}> Col 2-1</Col>
                <Col lg={4}> Col 2-2</Col>
                <Col lg={4}> Col 2-3</Col>
            </Row>
            <Row>
                <Col lg={3}> Col 3-1</Col>
                <Col lg={3}> Col 3-2</Col>
                <Col lg={3}> Col 3-3</Col>
                <Col lg={3}> Col 3-4</Col>
            </Row>
            <Row>
                <Col lg={2}> Col 4-1</Col>
                <Col lg={2}> Col 4-2</Col>
                <Col lg={2}> Col 4-3</Col>
                <Col lg={2}> Col 4-4</Col>
                <Col lg={2}> Col 4-5</Col>
                <Col lg={2}> Col 4-5</Col>
            </Row>
        </>;
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
            proceed,
        } = self.props;
        return <>
            <Button
                className="button-l"
                onClick={(e) => { e.preventDefault(); proceed(null) }}>
                <i className="fa fa-save pr-2"></i>Cancel
            </Button>
            <Button
                className="button-l"
                onClick={(e) => { e.preventDefault(); self.submitForm() }}>
                <i className="fa fa-save pr-2"></i>Save
            </Button></>;
    }

    submitForm() {
        const self = this;
        const {
            proceed,
        } = self.props;
        proceed({ result: false });
    }
}
export default function urlImport(
    title,
    options = {}
) {
    var escape = false;
    return createConfirmation(confirmable(UrlImportForm))({
        title,
        escape,
        ...options
    });
}
