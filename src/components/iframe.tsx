import React from 'react';

const Iframe = ({ source }: { source: string }) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    const src = source
    return (
        <div className="col-md-12">
            <div className="emdeb-responsive">
                <iframe src={src}></iframe>
            </div>
        </div>
    );
};

export default Iframe;