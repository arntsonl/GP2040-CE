import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import orderBy from 'lodash/orderBy';
import { Trans, useTranslation } from 'react-i18next';

import { AppContext } from '../Contexts/AppContext';
import ColorPicker from '../Components/ColorPicker';
import Section from '../Components/Section';
import DraggableListGroup from '../Components/DraggableListGroup';
import FormControl from '../Components/FormControl';
import FormSelect from '../Components/FormSelect';
import { BUTTONS } from '../Data/Buttons';
import LEDColors from '../Data/LEDColors';
import { hexToInt } from '../Services/Utilities';
import WebApi from '../Services/WebApi';

const GROUP_TYPES = [
    { label: 'Not Assigned', value: 0 },
	{ label: 'Stickless + 8-Buttons', value: 1 },
    { label: 'Joystick', value: 2},
	{ label: '8-Buttons', value: 3 },
    { label: 'Case LEDs', value: 4 },
];

const LIGHTING_EFFECTS = [
    { label: 'Solid', value: 0 },
	{ label: 'Fade', value: 1 },
	{ label: 'Single Chase', value: 2 },
    { label: 'Movie Chase', value: 3 },
    { label: 'Visor', value: 4 },
    { label: 'Twinkle', value: 5 },
];

const COLOR_EFFECTS = [
    { label: 'Single', value: 0 },
    { label: 'Rainbow', value: 1 },
	{ label: 'Theme', value: 2 },

];

const THEME_EFFECTS = [
    { label: 'Single', value: 0 },
	{ label: 'Custom Theme', value: 1 },
	{ label: 'Rainbow', value: 2 },
];

const LED_FORMATS = [
	{ label: 'GRB', value: 0 },
	{ label: 'RGB', value: 1 },
	{ label: 'GRBW', value: 2 },
	{ label: 'RGBW', value: 3 },
];

const defaultValue = {
	brightnessMaximum: 255,
};


const schema = yup.object().shape({
});

const FormContext = ({
	buttonLabels,
	setDataSources,
}) => {
	const { setFieldValue, setValues } = useFormikContext();
	const { setLoading } = useContext(AppContext);

	useEffect(() => {
		async function fetchData() {
		}
		fetchData();
		console.log('update');
	}, []);

	useEffect(() => {
	}, [setFieldValue]);

	return null;
};

export default function LEDReconfigPage() {
	const { buttonLabels, updateUsedPins } = useContext(AppContext);
	const [saveMessage, setSaveMessage] = useState('');
	const [dataSources, setDataSources] = useState([[], []]);
	const { buttonLabelType, swapTpShareLabels } = buttonLabels;
	const { t } = useTranslation('');
	const onSuccess = async (values) => {
		const data = { ...values };
		
		//const success = await WebApi.setLedOptions(data);
		//if (success) updateUsedPins();

		//setSaveMessage(
		//	success
		//		? t('Common:saved-success-message')
		//		: t('Common:saved-error-message'),
		//);
	};

	const onSubmit = (e, handleSubmit, setValues, values) => {
		setSaveMessage('');
		e.preventDefault();

		setValues(values);
		handleSubmit();
	};

    const aquaticCreatures = [
        { label: 'Shark', value: 'Shark' },
        { label: 'Dolphin', value: 'Dolphin' },
        { label: 'Whale', value: 'Whale' },
        { label: 'Octopus', value: 'Octopus' },
        { label: 'Crab', value: 'Crab' },
        { label: 'Lobster', value: 'Lobster' },
      ];

	return (
		<Formik
			validationSchema={schema}
			onSubmit={onSuccess}
			initialValues={defaultValue}
		>
			{({
				handleSubmit,
				handleChange,
				handleBlur,
				setValues,
				values,
				errors,
			}) => (
				<Form
					noValidate
					onSubmit={(e) => onSubmit(e, handleSubmit, setValues, values)}
				>
                    <Tab.Container id="left-tabs-example"
                        defaultActiveKey="configuration">
                        <Row>
                            <Col sm={2}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="configuration">Configuration</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="groups">Groups</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="effects">Lighting Effects</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="reactive">Reactive Effects</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="playerleds">Player LEDs</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="turboleds">Turbo LED</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="configuration">
                                    <Section title={t('LedConfig:rgb.header-text')}>
                                        <Row>
                                            <FormControl
                                                type="number"
                                                label={t('LedConfig:rgb.data-pin-label')}
                                                name="dataPin"
                                                className="form-control-sm"
                                                groupClassName="col-sm-4 mb-3"
                                                value={values.dataPin}
                                                error={errors.dataPin}
                                                isInvalid={errors.dataPin}
                                                onChange={handleChange}
                                                min={-1}
                                                max={29}
                                            />
                                            <FormSelect
                                                label={t('LedConfig:rgb.led-format-label')}
                                                name="ledFormat"
                                                className="form-select-sm"
                                                groupClassName="col-sm-4 mb-3"
                                                value={values.ledFormat}
                                                error={errors.ledFormat}
                                                isInvalid={errors.ledFormat}
                                                onChange={handleChange}
                                            >
                                                {LED_FORMATS.map((o, i) => (
                                                    <option key={`ledFormat-option-${i}`} value={o.value}>
                                                        {o.label}
                                                    </option>
                                                ))}
                                            </FormSelect>
                                            <FormControl
                                                type="number"
                                                label={t('LedConfig:rgb.led-brightness-maximum-label')}
                                                name="brightnessMaximum"
                                                className="form-control-sm"
                                                groupClassName="col-sm-4 mb-3"
                                                value={values.brightnessMaximum}
                                                error={errors.brightnessMaximum}
                                                isInvalid={errors.brightnessMaximum}
                                                onChange={handleChange}
                                                min={0}
                                                max={255}
                                            />
                                        </Row>
                                        <Row>
                                            <FormControl
                                                type="number"
                                                label={t('LedConfig:rgb.led-brightness-steps-label')}
                                                name="brightnessSteps"
                                                className="form-control-sm"
                                                groupClassName="col-sm-4 mb-2"
                                                value={values.brightnessSteps}
                                                error={errors.brightnessSteps}
                                                isInvalid={errors.brightnessSteps}
                                                onChange={handleChange}
                                                min={1}
                                                max={10}
                                            />
                                            <FormControl
                                                type="number"
                                                label="Total Count"
                                                name="brightnessSteps"
                                                className="form-control-sm"
                                                groupClassName="col-sm-4 mb-2"
                                                value={values.brightnessSteps}
                                                error={errors.brightnessSteps}
                                                isInvalid={errors.brightnessSteps}
                                                onChange={handleChange}
                                                min={1}
                                                max={10}
                                            />
                                        </Row>
                                    </Section>
                                    <Button type="submit">{t('Common:button-save-label')}</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="groups">
                                    <Section title="Group Configuration">
                                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                                            <Row>
                                                <FormSelect
                                                    label="Group Selected"
                                                    name="gorupSelected"
                                                    className="form-select-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                    value={values.ledFormat}
                                                    error={errors.ledFormat}
                                                    isInvalid={errors.ledFormat}
                                                    onChange={handleChange}
                                                >
                                                    {[1,2,3,4,5].map((o, i) => (
                                                        <option key={`ledGroupNum-option-${o}`} value={o}>
                                                            {o}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                                <FormSelect
                                                    label="Group Type"
                                                    name="groupType"
                                                    className="form-select-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                    value={values.ledFormat}
                                                    error={errors.ledFormat}
                                                    isInvalid={errors.ledFormat}
                                                    onChange={handleChange}
                                                >
                                                    {GROUP_TYPES.map((o, i) => (
                                                        <option key={`ledGroupType-option-${i}`} value={o.value}>
                                                            {o.label}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                                <FormControl
                                                    type="number"
                                                    label="LEDs Per Object"
                                                    name="dataPin"
                                                    className="form-control-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                    value={values.dataPin}
                                                    error={errors.dataPin}
                                                    isInvalid={errors.dataPin}
                                                    onChange={handleChange}
                                                    min={-1}
                                                    max={29}
                                                />
                                            </Row>
                                            <Row>
                                                <FormControl
                                                    type="number"
                                                    label="Index LED Start"
                                                    name="dataPin"
                                                    className="form-control-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                    value={values.dataPin}
                                                    error={errors.dataPin}
                                                    isInvalid={errors.dataPin}
                                                    onChange={handleChange}
                                                    min={-1}
                                                    max={29}
                                                />
                                                <FormControl
                                                    type="number"
                                                    label="Index LED End"
                                                    name="dataPin"
                                                    className="form-control-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                    value={values.dataPin}
                                                    error={errors.dataPin}
                                                    isInvalid={errors.dataPin}
                                                    onChange={handleChange}
                                                    min={-1}
                                                    max={29}
                                                    disabled
                                                />
                                                <FormControl
                                                    type="number"
                                                    label="Number of Objects"
                                                    name="brightnessSteps"
                                                    className="form-control-sm"
                                                    groupClassName="col-sm-4 mb-2"
                                                    value={values.brightnessSteps}
                                                    error={errors.brightnessSteps}
                                                    isInvalid={errors.brightnessSteps}
                                                    onChange={handleChange}
                                                    min={1}
                                                    max={10}
                                                />
                                            </Row>
                                            <Button className="form-control-sm"
                                                groupClassName="col-sm-4 mb-2"
                                                type="button">
                                                    Edit Order
                                            </Button>
                                        </Tab.Container>
                                    </Section>
                                    <Button type="submit">{t('Common:button-save-label')}</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="effects">
                                    <Section title="Lighting Effects">
                                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                                            <Row>
                                                <FormSelect
                                                    label="Group Selected"
                                                    name="gorupSelected"
                                                    className="form-select-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                    value={values.ledFormat}
                                                    error={errors.ledFormat}
                                                    isInvalid={errors.ledFormat}
                                                    onChange={handleChange}
                                                >
                                                    {[1,2,3,4,5].map((o, i) => (
                                                        <option key={`ledGroupNum-option-${o}`} value={o}>
                                                            {o}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                                <FormSelect
                                                    label="Group Type"
                                                    name="groupType"
                                                    className="form-select-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                    value={values.ledFormat}
                                                    error={errors.ledFormat}
                                                    isInvalid={errors.ledFormat}
                                                    onChange={handleChange}
                                                    disabled
                                                >
                                                    {GROUP_TYPES.map((o, i) => (
                                                        <option key={`ledGroupType-option-${i}`} value={o.value}>
                                                            {o.label}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                                <Form.Group className="col-sm-4 mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Does Not React</Form.Label>
                                                    <Form.Check 
                                                        label="Enabled"                                                       
                                                        type="switch"
                                                        id="custom-switch"
                                                        name="switchReverse"
                                                        className="col-sm-4 mb-3"
                                                        isInvalid={false}
                                                        onChange={(e) => {
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <FormSelect
                                                    label="Lighting Effect"
                                                    name="lightingSelected"
                                                    className="form-select-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                >
                                                    {LIGHTING_EFFECTS.map((o, i) => (
                                                        <option key={`ledEffectsType-option-${i}`} value={o.value}>
                                                            {o.label}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                                <FormSelect
                                                    label="Color Type"
                                                    name="colorSelected"
                                                    className="form-select-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                >
                                                    {COLOR_EFFECTS.map((o, i) => (
                                                        <option key={`colorEffectsType-option-${i}`} value={o.value}>
                                                            {o.label}
                                                        </option>
                                                    ))}
                                                </FormSelect>
                                                <Form.Group className="col-sm-4 mb-3" controlId="formBasicEmail">
                                                    <Form.Label htmlFor="exampleColorInput">Color Selection</Form.Label>
                                                    <Form.Group className="mx-4" controlId="formBasicEmail">
                                                        <Form.Control
                                                            type="color"
                                                            id="exampleColorInput"
                                                            defaultValue="#563d7c"
                                                            title="Choose your color"
                                                        />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <FormControl
                                                    type="number"
                                                    label="Effect Speed"
                                                    name="effectSpeed"
                                                    className="form-control-sm"
                                                    groupClassName="col-sm-4 mb-3"
                                                    value={15}
                                                    min={1}
                                                    max={30}
                                                />
                                                <Form.Group className="col-sm-4 mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Lock Speed</Form.Label>
                                                    <Form.Check 
                                                        label="Enabled"                                                       
                                                        type="switch"
                                                        id="custom-switch"
                                                        name="switchReverse"
                                                        className="col-sm-4 mb-3"
                                                        isInvalid={false}
                                                        onChange={(e) => {
                                                        }}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="col-sm-4 mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Reverse Effect</Form.Label>
                                                    <Form.Check 
                                                        label="Enabled"                                                       
                                                        type="switch"
                                                        id="custom-switch"
                                                        name="switchReverse"
                                                        className="col-sm-4 mb-3"
                                                        isInvalid={false}
                                                        onChange={(e) => {
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Row>
                                        </Tab.Container>
                                    </Section>
                                    <Button type="submit">{t('Common:button-save-label')}</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="turboleds">
                                    <div id="Turbo LED">
                                        <Row className="mb-3">
                                            <div className="col-sm-3 mb-3">
                                                <Button type="button">
                                                    Save
                                                </Button>
                                            </div>
                                        </Row>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
				</Form>
			)}
		</Formik>
	);
}

