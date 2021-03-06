import React from 'react';
import { Card, Form } from 'react-bootstrap';
import AppInputField from '../AppInputField';
import { tokenTypeMapping } from 'Constant';
import NameValuePair from './NameValuePair';
import CheckedField from './CheckedField';
import { Row, Col } from 'react-bootstrap';

const TokenTypeCard = (formik, label) => {
	return (
		<Card style={{ width: '100%', height: '100%' }}>
			<Card.Body>
				<div className="form-header">Token Type</div>

				<hr className="form-hr" />

				<AppInputField
					as="select"
					formik={formik}
					label="Token Type"
					id="tokenType"
					placeholder="Name of your token"
					alwaysShow
				>
					{/* <option value="" disabled selected = "selected">Choose a token type</option> */}
					{tokenTypeMapping.map((tokenType) => {
						return (
							<option key={tokenType.value} value={tokenType.value}>
								{tokenType.name}
							</option>
						);
					})}
				</AppInputField>
				{['mintable_irc3', 'burnable_irc3'].includes(
					formik.formik.values.tokenType
				) && (
					<Form.Group className="terms-of-use">
						<Form.Check
							type="checkbox"
							label="Only owner can mint"
							{...formik.formik.getFieldProps('onlyOwnerCanMint')}
						/>

						{formik.formik.touched['onlyOwnerCanMint'] &&
						formik.formik.errors['onlyOwnerCanMint'] ? (
							<div style={{ color: 'red' }}>
								{formik.formik.errors['onlyOwnerCanMint']}
							</div>
						) : null}
					</Form.Group>
				)}

				{formik.formik.values.supplyType && (
					<NameValuePair
						name="Supply Type"
						value={formik.formik.values.supplyType}
					/>
				)}

				{/* <NameValuePair name = "Access Type" value = {formik.formik.values.accessType} />
                <NameValuePair name = "Transfer Type" value = {formik.formik.values.transferType} /> */}

				<Row style={{ marginTop: '15px' }}>
					<Col md="12">
						<CheckedField
							checked={formik.formik.values.burnable}
							name={'Burnable'}
							info="Tokens can be burned(destroyed) at any time and reduced from the total supply."
						/>
					</Col>
				</Row>

				<Row style={{ marginTop: '15px' }}>
					<Col md="12">
						<CheckedField
							checked={formik.formik.values.mintable}
							name="Mintable"
							info="New tokens can be created at any time and added to total supply."
						/>
					</Col>
				</Row>
				{formik.formik.values.pausable !== undefined && (
					<Row style={{ marginTop: '15px' }}>
						<Col md="12">
							<CheckedField
								checked={formik.formik.values.pausable}
								name={'Pausable'}
								info="Token transfers can be paused and unpaused as per the requirement."
							/>
						</Col>
					</Row>
				)}

				{formik.formik.values.tokenRecover !== undefined && (
					<Row style={{ marginTop: '15px' }}>
						<Col md="12">
							<CheckedField
								checked={formik.formik.values.tokenRecover}
								name="Token Recover"
								info="Allow the contract owner to recover tokens sent to contract."
							/>
						</Col>
					</Row>
				)}

				{formik.formik.values.approval !== undefined && (
					<Row style={{ marginTop: '15px' }}>
						<Col md="12">
							<CheckedField
								checked={formik.formik.values.approval}
								name="Approval"
								// info="Approval"
							/>
						</Col>
					</Row>
				)}

				{formik.formik.values.tokenUri !== undefined && (
					<Row style={{ marginTop: '15px' }}>
						<Col md="12">
							<CheckedField
								checked={formik.formik.values.tokenUri}
								name="TokenURI"
								// info="Approval"
							/>
						</Col>
					</Row>
				)}
				{/* <Row style = {{marginTop: '15px'}}>
                    <Col md = "6">
                        <CheckedField checked = {formik.formik.values.verifiedSourceCode} name = {"Verified Source Code"} info = "Your source code will be automatically verified on Icon Tracker." />
                    </Col>

                    <Col md = "6">
                        <CheckedField checked = {formik.formik.values.removeCopyright} name = "Remove Copyright" info = "Remove the link pointing to this page from your contract."  />
                    </Col>

                </Row> */}
			</Card.Body>
		</Card>
	);
};

export default TokenTypeCard;
