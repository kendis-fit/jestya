import React from "react";
import { useVanillaFetch } from "vanilla-hooks";

import Error from "../Error";
import resource from "../../api/resource";

export interface IUserProps {
    userId: string;
}

const User = (props: IUserProps) => {
    const { data: user, loading, error } = useVanillaFetch(() => resource.users.findById(props.userId));

    if (error) {
        return <Error error={error} />
    }

    if (loading) {
        return <div>loading...</div>
    }

    console.log(user);

    return(
        <div>User info</div>
    );
}

export default User;
