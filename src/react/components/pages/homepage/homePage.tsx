import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./homePage.scss";
import IProjectActions, * as projectActions from "../../../../redux/actions/projectActions";
import { IApplicationState, IProject } from "../../../../models/applicationState";
import CondensedList from "../../common/condensedList/condensedList";
import RecentProjectItem from "./recentProjectItem";
import FilePicker from "../../common/filePicker/filePicker";
import { Link, RouteComponentProps } from "react-router-dom";
import { strings } from "../../../../common/strings";
import Confirm from "../../common/confirm/confirm";
import MessageBox from "../../messageBox/messageBox";
import Button from "reactstrap/lib/Button";

export interface IHomepageProps extends RouteComponentProps, React.Props<HomePage> {
    recentProjects: IProject[];
    actions: IProjectActions;
}

function mapStateToProps(state: IApplicationState) {
    return {
        recentProjects: state.recentProjects,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(projectActions, dispatch),
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends React.Component<IHomepageProps> {
    private filePicker: React.RefObject<FilePicker>;
    private deleteConfirm: React.RefObject<Confirm>;
    private messageBox: React.RefObject<MessageBox>;

    constructor(props: IHomepageProps, context) {
        super(props, context);

        this.filePicker = React.createRef<FilePicker>();
        this.messageBox = React.createRef<MessageBox>();
        this.deleteConfirm = React.createRef<Confirm>();
        this.loadSelectedProject = this.loadSelectedProject.bind(this);
        this.onProjectFileUpload = this.onProjectFileUpload.bind(this);
        this.deleteProject = this.deleteProject.bind(this);

        this.props.actions.closeProject();
    }

    public render() {
        return (
            <div className="app-homepage">
                <div className="app-homepage-main text-light">
                    <ul>
                        <li>
                            <Link to={"/projects/create"} className="p-5">
                                <i className="fas fa-folder-plus fa-9x"></i>
                                <h6>{strings.homePage.newProject}</h6>
                            </Link>
                        </li>
                        <li>
                            <a href="#" onClick={() => this.filePicker.current.upload()} className="p-5 file-upload">
                                <i className="fas fa-folder-open fa-9x"></i>
                                <h6>{strings.homePage.openProject}</h6>
                            </a>
                            <FilePicker ref={this.filePicker}
                                onChange={this.onProjectFileUpload}
                                onError={this.onProjectFileUploadError} />
                        </li>
                        <li>
                            <a href="#" onClick={() => this.messageBox.current.open()} className="p-5 file-upload">
                                <i className="fas fa-cloud fa-9x"></i>
                                <h6>Alert Test</h6>
                            </a>
                            <MessageBox title="Title"
                                message={() => Date.now().toString()}
                                ref={this.messageBox}>
                                <Button color="success">Yes</Button>
                                <Button color="danger">No</Button>
                                <Button>Cancel</Button>
                            </MessageBox>
                        </li>
                    </ul>
                </div>
                {(this.props.recentProjects && this.props.recentProjects.length > 0) &&
                    <div className="app-homepage-recent bg-lighter-1">
                        <CondensedList
                            title={strings.homePage.recentProjects}
                            Component={RecentProjectItem}
                            items={this.props.recentProjects}
                            onClick={this.loadSelectedProject}
                            onDelete={(project) => this.deleteConfirm.current.open(project)} />
                    </div>
                }
                <Confirm title="Delete Project"
                    ref={this.deleteConfirm}
                    message={(project: IProject) => `Are you sure you want to delete project '${project.name}'?`}
                    confirmButtonColor="danger"
                    onConfirm={this.deleteProject} />
            </div>
        );
    }

    private onProjectFileUpload = (e, projectJson) => {
        const project: IProject = JSON.parse(projectJson);
        this.loadSelectedProject(project);
    }

    private onProjectFileUploadError = (e, err) => {
        console.error(err);
    }

    private loadSelectedProject = async (project: IProject) => {
        await this.props.actions.loadProject(project);
        this.props.history.push(`/projects/${project.id}/edit`);
    }

    private deleteProject = async (project: IProject) => {
        await this.props.actions.deleteProject(project);
    }
}
