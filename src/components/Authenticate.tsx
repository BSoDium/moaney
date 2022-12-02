import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Text } from '@nextui-org/react';
import Auth from '../utils/Auth';

export default function Authenticate() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    code && Auth.setSessionCode(code);
  }, [searchParams]);
  
  
  return (
    <div className='container'>
      <Text>
        Your session code is: <b>{searchParams.get('code')}</b>

      </Text>
    </div>
  );
}