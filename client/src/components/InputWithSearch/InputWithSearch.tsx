import React, { useEffect, useState } from "react";

import Input from "../Input";
import ResultSearch from "../ResultSearch";
import { IInputProps } from "../Input/Input";

export interface IInputWithSearch extends IInputProps {
    nameSearch: string;
    resource: () => Promise<any[]>;
}

const InputWithSearch = (props: IInputWithSearch) => {
    const { nameSearch, ...rest } = props;
    const [foundEntities, setFoundEntities] = useState<any[]>([]); 

    useEffect(() => {
        const searchEntities = async () => {
            if (props.value.length > 3) {
                const entities = await props.resource();
                setFoundEntities(entities)
            } else {
                setFoundEntities([]);
            }
        }
        searchEntities();
    }, [setFoundEntities]);

    return(
        <Input {...rest}>
            <ResultSearch search={[{ name: nameSearch, items: foundEntities }]} />
        </Input>
    )
}

export default InputWithSearch;
