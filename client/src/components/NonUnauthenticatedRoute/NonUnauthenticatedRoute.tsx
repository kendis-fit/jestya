import React from 'react';
import { useVanillaFetch } from "vanilla-hooks";
import { Redirect, useRouteMatch } from 'react-router-dom';

import resource from '../../api/resource';
import Registration from '../Registration/Registration';

const NonUnauthenticatedRoute = () => {
    const { url } = useRouteMatch();
    const { data: superAdminExisted, loading } = useVanillaFetch(() => resource.users.findByRole("SUPER_ADMIN"));

    if (loading) {
        return <div>loading...</div>;
    }

    return(
        <>
            {
                superAdminExisted ? <Redirect to="/login" /> : url === "/registration" ? <Registration /> : <Redirect to="/registration" />
            }
        </>
    );
}

export default NonUnauthenticatedRoute;