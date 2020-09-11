import React from "react";

export interface IResultSearchItem {
    id: string;
    name: string;
    description?: string;
}

export interface IResultSearchProps {
    search: {
        name: string,
        items: IResultSearchItem[]
    }[],
    onChoose?: (id: IResultSearchItem) => void;
}

const ResultSearch = (props: IResultSearchProps) => {
    return(
        <>
            {
                props.search.reduce((first, second) => first + second.items.length, 0) > 0 ?
                    <ul className="result-search">
                        {
                            props.search.map((search, key) => (
                                <li key={key}>
                                    <h4 className="result-search__title">{search.name}</h4>
                                    {
                                        search.items.length > 0 ? <ul className="result-search">
                                        {
                                            search.items.map((item, key) => (
                                                <li className="result-search__item" key={key} onClick={() => props.onChoose?.(item)}>
                                                    <h5>{item.name}</h5>
                                                    <span>{item.description}</span>
                                                </li>
                                            ))
                                        }
                                        </ul> : null
                                    }
                                </li>
                            ))
                        }
                    </ul> : null
            }
        </>
    );
}

export default ResultSearch;