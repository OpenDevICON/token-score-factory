import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';

function DeployResultModal({ deployResult, ...props }) {
    return (
        <Modal
            {...props}
            size="lgxl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="deploy-result-modal"
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="deploy-token-header">
                        {
                            deployResult.success ?
                                <>
                                    <img src="https://o.remove.bg/downloads/b0690281-4a68-4b19-8679-6cca5f8df8bf/169-1695521_kisspng-computer-icons-check-mark-presentation-symbol-ok-removebg-preview.png" />
                                Token Deployed Successfully
                            </> :
                                <>
                                    <img src="https://o.remove.bg/downloads/b0690281-4a68-4b19-8679-6cca5f8df8bf/169-1695521_kisspng-computer-icons-check-mark-presentation-symbol-ok-removebg-preview.png" />
                                Token Deploy Failed
                            </>
                        }

                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Row className="result-info">
                    <Col>
                        {deployResult.success ?
                            <span>The token has been deployed successfully. Please copy the transaction hash and the score address.</span> :
                            <>
                                Token Deployed Failed <br /> {deployResult.errorMessage ? deployResult.errorMessage : null}
                            </>

                        }
                    </Col>
                </Row>
                {
                    deployResult.txHash ?
                        <Row className="result-row">
                            <Col lg="3" className="result-row-key">Transaction Hash:</Col>
                            <Col lg="9" className="result-row-value">
                                <a href={`${deployResult?.selectedNetworkData?.TRACKER_URL}transaction/${deployResult.txHash}`} target="_blank">{deployResult.txHash}</a>
                            </Col>
                        </Row> : null
                }

                {
                    deployResult.success ?
                        <Row className="result-row">
                            <Col lg="3" className="result-row-key">Score Address:</Col>
                            <Col lg="9" className="result-row-value">
                                <a href={`${deployResult?.selectedNetworkData?.TRACKER_URL}contract/${deployResult.scoreAddress}`} target="_blank">{deployResult.scoreAddress}</a>
                            </Col>

                        </Row> : null
                }

            </Modal.Body>
        </Modal>
    );
}

export default DeployResultModal;