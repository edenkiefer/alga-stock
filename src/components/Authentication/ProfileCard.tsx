import * as React from 'react';
import { User } from '../../services/Authentication.service';
import Form from '../../shared/Form';
import Input from '../../shared/Input';

declare interface ProfileCardProps {
  user: User
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  return <>
    <Form title='Profile'>
      <Input 
        label='Name'
        value={props.user.user}
        disabled
      />
      <Input 
        label='Email'
        value={props.user.email}
        disabled
      />
    </Form>
  </>
}

export default ProfileCard