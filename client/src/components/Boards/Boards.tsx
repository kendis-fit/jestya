import React, { useEffect } from "react";
import { useVanillaFetch } from "vanilla-hooks";

import resource from "../../api/resource";
import { IBoard } from "../../api/boardProjects";
import ListBoardsContainer from "../ListBoards/ListBoardsContainer";

export interface IBoards {
    projectId: string;
	initBoards: (board: IBoard[]) => void;
}

const Boards = (props: IBoards) => {
    const { data: boards, loading, error } = useVanillaFetch(() => resource.projects.findBoards(props.projectId));

    useEffect(() => {
		if (boards) {
			props.initBoards(boards);
        }
        if (error) {
            props.initBoards([]);
        }
	}, [boards, props, error]);

    if (loading) {
        return <div>loading..</div>
    }

    return(
        <ListBoardsContainer boards={[]} />
    );
}

export default Boards;
