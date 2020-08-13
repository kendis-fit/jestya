import { Dispatch } from "redux";
import { connect } from "react-redux";

import SearchProjects from "./SearchProjects";
import { searchProject } from "../../reducers/searchProject/searchProjectActions";
import { ISearchProjectAction } from "../../reducers/searchProject/interfaces/ISearchProjectAction";

const mapDispatchToProps = (dispatch: Dispatch<ISearchProjectAction>) => ({
	onSearch: (stringText: string) => dispatch(searchProject(stringText)),
});

const SearchProjectsContainer = connect(null, mapDispatchToProps);

export default SearchProjectsContainer(SearchProjects);
