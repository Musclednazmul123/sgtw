import React from 'react';
import { Card, EmptyState, Button } from '@shopify/polaris';
import { emptyState } from '../assets';
import { PickDetailsModal } from './';

const EmptyStateComponent = ({ samples }) => {
  return (
    <div>
      <EmptyState
        heading="This is where you’ll manage your packs"
        image={emptyState}
      >
        <p>You can create a new pack or import your pack inventory.</p>
        <br />
        {samples ? (
          <Button primary>+ Add Samples</Button>
        ) : (
          <PickDetailsModal buttonText="+ Add New Pack" />
        )}
      </EmptyState>
    </div>
  );
};

export default EmptyStateComponent;
