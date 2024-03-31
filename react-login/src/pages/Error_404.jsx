import React from 'react';

const Error_404 = () => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{height: '910px'}}>
            <div className="text-center">
                <h1 className="display-1 text-danger">Error 404: Not Found</h1>
                <p className="lead text-light">Sorry, the page you are looking for does not exist.</p>
                <p className="text-light">Please check the URL or go back to the <a href="/" className="text-decoration-none">home page</a>.</p>
            </div>
        </div>
    );
};

export default Error_404;
