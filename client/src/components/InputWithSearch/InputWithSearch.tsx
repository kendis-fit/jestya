import React, { useEffect, useState } from "react";

import Input from "../Input";
import ResultSearch from "../ResultSearch";
import { IResultSearchItem } from "../ResultSearch/ResultSearch";
import SelectedEntity from "../SelectedEntity";

export interface IInputWithSearch {
    label: string;
    nameSearch: string;
    helperText?: string;
    onChoose?: (id: string) => void;
    resource: (value: string) => Promise<any[]>;
}

const InputWithSearch = (props: IInputWithSearch) => {
    const [entity, setEntity] = useState<IResultSearchItem>();
    const [value, setValue] = useState("");
    const [foundEntities, setFoundEntities] = useState<any[]>([]); 

    useEffect(() => {
        const searchEntities = async () => {
            if (value.length >= 1) {
                const entities = await props.resource(value);
                setFoundEntities(entities)
            } else {
                setFoundEntities([]);
            }
        }
        searchEntities();
    }, [value, setFoundEntities, props]);

    const chooseEntity = (entity: IResultSearchItem) => {
        setEntity(entity);
        props.onChoose?.(entity.id);
    }

    if (entity) {
        return (
            <div className="selected-entity_wrapper">
                <label>{props.label}</label>
                <SelectedEntity name={entity.name} onClose={() => setEntity(undefined)} />
            </div>
        );
    }

    return(
        <Input heplerText={props.helperText} label={props.label} name="" value={value} onChange={(e: any) => setValue(e.currentTarget.value)}>
            <ResultSearch onChoose={value => chooseEntity(value.item)} search={[{ name: props.nameSearch, items: foundEntities }]} />
        </Input>
    )
}

export default InputWithSearch;
