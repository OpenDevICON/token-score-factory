import React from 'react';
import { Row } from 'react-bootstrap';

const FAQ = ({ faq, showAnswer, setShowAnswer }) => {
    return (
        <>
            <div className="faq-qstn"
                onClick={setShowAnswer}>{faq.qstn}</div>
            {
                showAnswer &&
                <div className="faq-ans" dangerouslySetInnerHTML={{ __html: faq.ans }}></div>
            }


        </>
    )
}

export default FAQ;