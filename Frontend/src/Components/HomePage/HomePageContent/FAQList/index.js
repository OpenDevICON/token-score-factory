import { faqList } from 'Constant/faqList';
import React from 'react';
import { Row } from 'react-bootstrap';
import FAQ from './FAQ';

const FAQList = () => {
    return (
        <>
            <Row className="homepage-header-container">
                <span className="homepage-header">FAQ</span>
            </Row>
            <Row className="homepage-header-container faq">
                {
                    faqList.map(faq => <FAQ faq={faq} />)
                }
            </Row>
        </>
    )
}

export default FAQList;