import { faqList } from 'Constant/faqList';
import React from 'react';
import { Row } from 'react-bootstrap';
import FAQ from './FAQ';


const FAQList = () => {
    
    let [showAnswerIndex, setShowAnswerIndex] = React.useState(0);
    return (
        <>
            <Row className="homepage-header-container">
                <span className="homepage-header">FAQ</span>
            </Row>
            <Row className="homepage-header-container faq">
                {
                    faqList.map((faq, index) => <FAQ faq={faq} key={index} showAnswer={index === showAnswerIndex} 
                            setShowAnswer={() => setShowAnswerIndex(index)}  />)
                }
            </Row>
        </>
    )
}

export default FAQList;