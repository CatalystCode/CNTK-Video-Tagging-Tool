import { Dispatch, Action } from "redux";
import ProjectService from "../../services/projectService";
import { IProject, IAsset, IAssetMetadata } from "../../models/applicationState";
import { ActionTypes } from "./actionTypes";
import { AssetService } from "../../services/assetService";
import { ExportProviderFactory } from "../../providers/export/exportProviderFactory";
import { createPayloadAction, IPayloadAction, createAction } from "./actionCreators";

export default interface IProjectActions {
    loadProjects(): Promise<IProject[]>;
    loadProject(value: IProject | string): Promise<IProject>;
    saveProject(project: IProject): Promise<IProject>;
    deleteProject(project: IProject): Promise<void>;
    closeProject();
    exportProject(project: IProject): Promise<void>;
    loadAssets(project: IProject): Promise<IAsset[]>;
    loadAssetMetadata(project: IProject, asset: IAsset): Promise<IAssetMetadata>;
    saveAssetMetadata(project: IProject, assetMetadata: IAssetMetadata): Promise<IAssetMetadata>;
}

export function loadProject(value: string | IProject) {
    return async (dispatch: Dispatch) => {
        try {
            let project: IProject = value as IProject;

            if (typeof (value) === "string") {
                const projectService = new ProjectService();
                project = await projectService.get(value);
            }

            dispatch(loadProjectAction(project));

            return project;
        } catch (err) {
            throw err;
        }
    };
}

export function loadProjects() {
    return async (dispatch: Dispatch) => {
        const projectService = new ProjectService();
        const projects = await projectService.getList();
        dispatch(loadProjectsAction(projects));

        return projects;
    };
}

export function saveProject(project: IProject) {
    return async (dispatch: Dispatch) => {
        const projectService = new ProjectService();
        project = await projectService.save(project);
        dispatch(saveProjectAction(project));

        return project;
    };
}

export function deleteProject(project: IProject) {
    return async (dispatch: Dispatch) => {
        const projectService = new ProjectService();
        await projectService.delete(project);
        dispatch(deleteProjectAction(project));
    };
}

export function closeProject() {
    return (dispatch: Dispatch) => {
        dispatch({ type: ActionTypes.CLOSE_PROJECT_SUCCESS });
    };
}

export function loadAssets(project: IProject) {
    return async (dispatch: Dispatch) => {
        const assetService = new AssetService(project);
        const assets = await assetService.getAssets();
        dispatch(loadProjectAssetsAction(assets));

        return assets;
    };
}

export function loadAssetMetadata(project: IProject, asset: IAsset) {
    return async (dispatch: Dispatch) => {
        const assetService = new AssetService(project);
        const assetMetadata = await assetService.getAssetMetadata(asset);
        dispatch(loadAssetMetadataAction(assetMetadata));

        return { ...assetMetadata };
    };
}

export function saveAssetMetadata(project: IProject, assetMetadata: IAssetMetadata) {
    return async (dispatch: Dispatch) => {
        const assetService = new AssetService(project);
        const savedMetadata = await assetService.save(assetMetadata);
        dispatch(saveAssetMetadataAction(savedMetadata));

        return { ...savedMetadata };
    };
}

export function exportProject(project: IProject) {
    return async (dispatch: Dispatch) => {
        if (project.exportFormat && project.exportFormat.providerType) {
            const exportProvider = ExportProviderFactory.create(
                project.exportFormat.providerType,
                project,
                project.exportFormat.providerOptions);

            await exportProvider.export();

            dispatch(exportProjectAction(project));
        }
    };
}

export interface ILoadProjectAction extends IPayloadAction<string, IProject> {
    type: ActionTypes.LOAD_PROJECT_SUCCESS;
}

export interface ICloseProjectAction extends Action<string> {
    type: ActionTypes.CLOSE_PROJECT_SUCCESS;
}

export interface ILoadProjectsAction extends IPayloadAction<string, IProject[]> {
    type: ActionTypes.LOAD_PROJECTS_SUCCESS;
}

export interface ISaveProjectAction extends IPayloadAction<string, IProject> {
    type: ActionTypes.SAVE_PROJECT_SUCCESS;
}

export interface IDeleteProjectAction extends IPayloadAction<string, IProject> {
    type: ActionTypes.DELETE_PROJECT_SUCCESS;
}

export interface ILoadProjectAssetsAction extends IPayloadAction<string, IAsset[]> {
    type: ActionTypes.LOAD_PROJECT_ASSETS_SUCCESS;
}

export interface ILoadAssetMetadataAction extends IPayloadAction<string, IAssetMetadata> {
    type: ActionTypes.LOAD_ASSET_METADATA_SUCCESS;
}

export interface ISaveAssetMetadataAction extends IPayloadAction<string, IAssetMetadata> {
    type: ActionTypes.SAVE_ASSET_METADATA_SUCCESS;
}

export interface IExportProjectAction extends IPayloadAction<string, IProject> {
    type: ActionTypes.EXPORT_PROJECT_SUCCESS;
}

export const loadProjectAction = createPayloadAction<ILoadProjectAction>(ActionTypes.LOAD_PROJECT_SUCCESS);
export const loadProjectsAction = createPayloadAction<ILoadProjectsAction>(ActionTypes.LOAD_PROJECTS_SUCCESS);
export const closeProjectAction = createAction<ICloseProjectAction>(ActionTypes.CLOSE_PROJECT_SUCCESS);
export const saveProjectAction = createPayloadAction<ISaveProjectAction>(ActionTypes.SAVE_PROJECT_SUCCESS);
export const deleteProjectAction = createPayloadAction<IDeleteProjectAction>(ActionTypes.DELETE_PROJECT_SUCCESS);
export const loadProjectAssetsAction =
    createPayloadAction<ILoadProjectAssetsAction>(ActionTypes.LOAD_PROJECT_ASSETS_SUCCESS);
export const loadAssetMetadataAction =
    createPayloadAction<ILoadAssetMetadataAction>(ActionTypes.LOAD_ASSET_METADATA_SUCCESS);
export const saveAssetMetadataAction =
    createPayloadAction<ISaveAssetMetadataAction>(ActionTypes.SAVE_ASSET_METADATA_SUCCESS);
export const exportProjectAction =
    createPayloadAction<IExportProjectAction>(ActionTypes.EXPORT_PROJECT_SUCCESS);
