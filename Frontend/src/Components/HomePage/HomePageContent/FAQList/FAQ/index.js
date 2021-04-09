import React from 'react';
import { Row } from 'react-bootstrap';

const FAQ = ({faq}) => {
    return (
        <>
            <div className = "faq-qstn">{faq.qstn}</div>
            <div className = "faq-ans" dangerouslySetInnerHTML ={{__html: faq.ans}}></div>

        </>
    )
}

export default FAQ;