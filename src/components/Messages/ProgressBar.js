import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProressBar = ({ uploadState, percenUploaded }) => (
    uploadState && (
        <Progress 
            className="progress__bar"
            percent={percenUploaded}
            progress
            indicating
            size="medium"
            inverted
        />
    )
);

export default ProressBar;