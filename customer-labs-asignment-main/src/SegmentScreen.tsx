import {
    DownOutlined,
    LeftOutlined,
    MinusOutlined
} from '@ant-design/icons';
import React, {
    useEffect,
    useState
} from 'react';
import "./SegmentScreen.scss"
import {
    Button,
    Drawer,
    Form,
    Input,
    Select,    
} from 'antd';

export default function SegmentScreen(props: any) {

    const [isVisibleChat, setVisibleChat] = useState<any>(false);    
    const [segmentObject, setSegmentObject] = useState<any>({
        "segment_name": null,
        "schema": [{}]
    });
    const [dropdownValue, setdropdownValue] = useState<any>(null);
    const [form]: any = Form.useForm();
    const [objSchema, setobjSchema] = useState<any>([]);
    const [objSchemafin, setobjSchemafin] = useState<any>([]);
    const [segmentName, setSegmentName] = useState('');
    const [schemas, setSchemas] = useState<any>([]);
    const [selectedSchema, setSelectedSchema] = useState('');
    const schemaOptions: any = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ];
    const handleSaveSegment = () => {
        const payload = {
            segment_name: segmentName,
            schema: schemas.map((schema: any) => ({ [schema]: schemaOptions?.find((option: any) => option.value === schema).label }))
        };

        fetch('https://webhook.site/your-webhook-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(response => {
            if (response.ok) {
                alert('Segment saved successfully');
            } else {
                alert('Failed to save segment');
            }
        });
    };

    const handleAddSchema = () => {
        if (selectedSchema && !schemas.includes(selectedSchema)) {
            setSchemas([...schemas, selectedSchema]);
            setSelectedSchema('');
        }
    };

    const handleRemoveSchema = (schema: any) => {
        setSchemas(schemas.filter((s: any) => s !== schema));
    };

    const availableSchemaOptions = schemaOptions.filter((option: any) => !schemas.includes(option?.value));


    useEffect(() => {
        if (isVisibleChat == true) {
            setSegmentObject({})
            setobjSchema([])
            setobjSchemafin([])
            setdropdownValue(null);
        }

    }, [isVisibleChat])


    const segmentContentView = () => {
        try {
            return (
                <div>
                    <div className='segment-content'>
                        <span className='left-icon'>
                            <LeftOutlined />
                        </span>
                        <span className='segment-title'>
                            View Audience
                        </span>
                    </div>
                    <div className='save-segment-button'
                        onClick={() => setVisibleChat(true)}
                    >
                        Save segment
                    </div>
                </div>
            )
        }
        catch (error) {
            console.log("Error in segmentContentView :: ", error)
        }
    } 
    const saveCancelFuntions = () => {
        return (
            <div className='save-cancel mgTB15'>
                <div>
                    <Button
                        className='save'
                        onClick={() =>
                            handleSaveSegment()
                        }

                    >
                        Save the Segment
                    </Button>
                </div>
                <div >
                    <Button
                        className='cancel'
                        onClick={() => setVisibleChat(!isVisibleChat)}
                    >
                        Cancel
                    </Button>
                </div>
            </div >
        )
    }

    let dropDownData: any = [
        {
            id: 0,
            name: "First Name"
        },
        {
            id: 1,
            name: "Last Name"
        },
        {
            id: 2,
            name: "Gender"
        },
        {
            id: 3,
            name: "Age"
        },
        {
            id: 4,
            name: "Account Name"
        },
        {
            id: 5,
            name: "City"
        },
        {
            id: 6,
            name: "State"
        },

    ]  
    const dropDownFunctions = () => {
        try {
            return (
                <div className='d-flex'>
                    <div className='d-flex-ac'>
                        {circle("gray")}
                    </div>                
                    <Select
                        id="add-schema"
                        className='select'
                        value={selectedSchema}
                        onChange={(value) => setSelectedSchema(value)}
                        placeholder="Add schema to segment"
                    >
                        <Select.Option option value="">Add schema to segment</Select.Option >
                        {availableSchemaOptions?.map((option: any) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                    <div className='remove-dropdown'
                    >
                        <MinusOutlined className='minus' />
                    </div>
                </div>
            )
        }
        catch (error) {
            console.log('Error in dropDownFunctions :: ', error)
        }

    }

    const circle = (text: any) => {
        return (
            <div className='circle'
                style={{ color: text, background: text }}
            >
            </div>
        )
    }

    const drawerContainer = () => {
        try {
            return (
                <div className='segment'>
                    <div className='title'>
                        Enter the Name of the Segment
                    </div>
                    <Input
                        type="text"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)}
                    />
                    <div className='instructons'>
                        To save your segment,you need to add the schemas to build the query
                    </div>
                    <div className='traits'>
                        <div className='trait-one'>
                            {circle("green")}

                            <div className='user-traits'>
                                - User Traits
                            </div>
                        </div>
                        <div className='trait-two'>
                            {circle("red")}
                            <div className='group-traits'>
                                - Group Traits
                            </div>
                        </div>
                    </div>
                    <div className='blue-box'>
                        {(schemas || []).map((schema: any, index: any) => {
                            return (
                                <div>
                                    <div className='d-flex mgTB15'>
                                        <div className='d-flex-ac'>
                                            {circle("gray")}
                                        </div>

                                        <Select
                                            suffixIcon={<DownOutlined />}
                                            className='select'
                                            placeholder={'select'}                                            
                                            value={schema}
                                            disabled
                                        >
                                            {dropDownData?.map((option: any, index: any) =>
                                                <Select.Option key={`${index}`} value={option?.value}>{option?.value}</Select.Option>
                                            )}
                                        </Select>
                                        <div className='remove-dropdown'
                                            onClick={() => handleRemoveSchema(schema)}
                                        >
                                            <MinusOutlined className='minus'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}

                    </div>            
                    {dropDownFunctions()}
                    <div className={'add-new-schema'}
                        onClick={() => handleAddSchema()}
                    >
                        + Add new schema
                    </div>
                    {saveCancelFuntions()}
                </div>
            )
        } catch (error) {
            console.log("Error in drawerContainer :: ", error)
        }
    }
    const SegmentDrawerView = () => {
        try {
            return (
                <div>
                    <Drawer
                        className='drawer-container'
                        width={450}
                        title="Saving Segment"
                        placement="right"
                        onClose={() => setVisibleChat(!isVisibleChat)}
                        open={isVisibleChat}
                        closeIcon={<LeftOutlined />}
                    >
                        <Form
                            id="form"
                            form={form}
                            autoComplete="off"
                            noValidate
                        >
                            {drawerContainer()}
                        </Form>
                    </Drawer>
                </div>
            )
        } catch (error) {
            console.log("Error in SegmentDrawerView :: ", error)
        }
    }
    return (
        <div className='segment-container'>
            {segmentContentView()}
            {SegmentDrawerView()}
        </div>
    );
}

