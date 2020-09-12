import React from "react";

export interface IResultSearchItem {
    id: string;
    name: string;
    description?: string;
}

export interface IResultSearchContainer {
    name: string;
    items: IResultSearchItem[];
}

export interface IResultSearchContainerItem {
    name: string;
    item: IResultSearchItem;
}

export interface IResultSearchProps {
    search: IResultSearchContainer[];
    onChoose?: (item: IResultSearchContainerItem) => void;
}

const ResultSearch = (props: IResultSearchProps) => {
    return(
        <>
            {
                props.search.reduce((first, second) => first + second.items.length ,0) > 0 ?
                    <ul className="result-search result-search--scroll">
                    {
                        props.search.map((search, key) => (
                            <>
                            {
                                search.items.length > 0 ? <li key={key}>
                                    <h4 className="result-search__title">{search.name}</h4>
                                    {
                                        search.items.length > 0 ? <ul className="result-search result-search--scroll">
                                        {
                                            search.items.map((item, key) => (
                                                <li className="result-search__item" key={key} onClick={() => props.onChoose?.({ name: search.name, item })}>
                                                    <h5>{item.name}</h5>
                                                    <span>{item.description}</span>
                                                </li>
                                            ))
                                        }
                                        </ul> : null
                                    }
                                </li> : null
                            }
                            </>
                        ))
                    }
                </ul>
                : null
            }
        </>
    );
}

export default ResultSearch;