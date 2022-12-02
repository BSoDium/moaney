import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Text } from '@nextui-org/react';

export default function Authenticate() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='container'>
      <Text>
        Your session code is: <b>{searchParams.get('code')}</b>

      </Text>
    </div>
  );
}