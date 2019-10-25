import React from 'react';
import Branding from './components/Branding';
import Landing from './content/Landing';

const Loading = () => (
    <Branding links={[]} loginLoading={true}>
        <Landing />
    </Branding>
);

export default Loading;
