import React,{useState} from 'react'
import { Modal,Card, Button, Form, FormLayout, TextField,Heading,Stack,Layout, Icon} from '@shopify/polaris'
import {modalstyle} from "../assets";
import {
  MobileCancelMajor
} from '@shopify/polaris-icons';

const PickDetailsModal = ({buttonText}) => {
let [active,setActive]=useState(true);



  return (
    <>
    <Button primary onClick={()=>{setActive(true)}}>{buttonText}</Button>
    {
      active ?
    <div className="modal">
      <div className='modalContent'>
        <button className='closeIcon' onClick={()=>{setActive(false)}}>
          <Icon source={MobileCancelMajor}  color="base"/>
          </button>
      <Card sectioned>
     <Form onSubmit={()=>{console.log("Inside form submit handler")}}>
    <Stack vertical>
        <Stack distribution='center'>
      <Heading>Pack Details</Heading>
      </Stack>
      
      <Stack distribution='fill'>
    <FormLayout>
      <TextField label="Pack Title" labelHidden autoComplete='off' type="text" placeholder='Pack Title'/>
      <TextField label="Pack Title" labelHidden autoComplete='off' type="search" placeholder='Pack Title'/>
      <TextField label="Pack Title" labelHidden autoComplete='off' type="search" placeholder='Pack Title'/>
    </FormLayout>
    </Stack>
    </Stack>
     </Form>
     </Card>
     </div>
     </div>
     : ""
}
     </>
  )
}

export default PickDetailsModal