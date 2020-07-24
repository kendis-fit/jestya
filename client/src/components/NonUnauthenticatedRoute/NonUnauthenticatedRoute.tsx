import React, { useState, useEffect } from 'react';

import resource from '../../api/resource';
import { Redirect } from 'react-router-dom';

const NonUnauthenticatedRoute = () => {
    const [superAdminExisted, setSuperAdminExisted] =  useState<boolean | null>(null);

    useEffect(() => {
        const fetchSuperAdmin = async () => {
            setSuperAdminExisted(await resource.users.findByRole("SUPER_ADMIN"));
        }
        fetchSuperAdmin();
    }, []);
    
    return(
        <>
            {
                superAdminExisted ? <Redirect to="/login" /> : <Redirect to="/registration" />
            }
        </>
    );
}

export default NonUnauthenticatedRoute;