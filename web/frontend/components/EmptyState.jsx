import React from 'react'
import { Card, EmptyState } from '@shopify/polaris'
import { emptyState } from '../assets'

const EmptyStateComponent=()=>{
  return (
    <div>
    <Card sectioned>
      <EmptyState 
    heading="This is where you’ll manage your products"
    action={{content:"+Add New Pack"}}
    image={emptyState}>
         <p>You can create a new product or import your product inventory.</p>
      </EmptyState>
    </Card>
    </div>
  )
}

export default EmptyStateComponent