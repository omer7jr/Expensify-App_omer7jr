import React from "react";
import ReactDOM from 'react-dom';

const Info = (props) => (
<div>
<h1>info</h1>
<p>the info is: {props.info}</p>
</div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
        {props.isAdmin && <p>this is private message, please don't share !</p>}
        <WrappedComponent {...props}/>
        </div>
    );
};


const withAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
        {props.isAuthenticated ? (
            <WrappedComponent {...props}/>
        ) : (
            <p>please login to view information</p>
        )}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = withAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info="these are the info"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="these are the info"/>, document.getElementById('app'));