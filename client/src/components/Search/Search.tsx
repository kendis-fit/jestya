import React, { useState, useEffect } from "react";

import resource from "../../api/resource";
import ResultSearch from "../ResultSearch";
import { IResultSearchItem, IResultSearchContainerItem } from "../ResultSearch/ResultSearch";

const Search = () => {
    const [value, setValue] = useState("");
    const [users, setUsers] = useState<IResultSearchItem[]>([]);
    const [projects, setProjects] = useState<IResultSearchItem[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            const users = await resource.search.findUsers("name", value);
            setUsers(users);
        }

        const getProjects = async () => {
            const projects = await resource.search.findProjects("name", value);
            setProjects(projects);
        }

        const getAll = async () => {
            if (value.length >= 1) {
                await getUsers();
                await getProjects();
            } else {
                setUsers([]);
                setProjects([]);
            }
        }

        getAll();
    }, [value]);

    const onChoose = (item: IResultSearchContainerItem) => {
        if (item.name === "Users") {
            window.location.href = `/users/${item.item.id}`;
        } else if (item.name === "Projects") {
            window.location.href = `/projects/${item.item.id}`;
        }
    }

    return(
        <li className="search_actions__items_wrapper">
            <div className="search">
                <span className="material-icons">search</span>
                <input value={value} onChange={e => setValue(e.currentTarget.value)} type="text" className="search__input" placeholder="Search..." />
            </div>
            {
                users.length > 0 || projects.length > 0 ? <div className="search__result">
                    <ResultSearch onChoose={onChoose} search={[{ name: "Users", items: users }, { name: "Projects", items: projects }]} />
                </div> : null
            }
        </li>
    );
}

export default Search;
