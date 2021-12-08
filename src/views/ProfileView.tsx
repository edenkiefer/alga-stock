import React from 'react';
import { connect } from 'react-redux';
import ProfileCard from '../components/Authentication/ProfileCard'
import Header from '../components/Header';
import { RootState } from '../redux';
import { User } from '../services/Authentication.service';
import Container from '../shared/Container';
import withPermission from '../utils/HOC/withPermission';

declare interface ProfileViewProps {
  user: User
}

const ProfileView: React.FC<ProfileViewProps> = (props) => {
  return <>
    <Header title='AlgaStock'/>
    <Container>
      <ProfileCard user={props.user} />
    </Container>
  </>
}

const mapStateToProps = (state: RootState) => ({
  user: state.authentication.profile
})

export default connect(mapStateToProps)(withPermission(['customer', 'admin'], '/')(ProfileView))