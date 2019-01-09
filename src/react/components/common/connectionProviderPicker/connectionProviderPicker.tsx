import React from "react";
import _ from "lodash";
import { StorageProviderFactory } from "../../../../providers/storage/storageProviderFactory";
import { AssetProviderFactory } from "../../../../providers/storage/assetProviderFactory";

export interface IConnectionProviderPickerProps {
    onChange: (value: string) => void;
    id: string;
    value: string;
}

export default function ConnectionProviderPicker(props: IConnectionProviderPickerProps) {
    const storageProviders = _.values(StorageProviderFactory.providers);
    const assetProviders = _.values(AssetProviderFactory.providers);

    const allProviders = _([])
        .concat(assetProviders)
        .concat(storageProviders)
        .uniqBy("name")
        .orderBy("displayName")
        .value();

    function onChange(e) {
        props.onChange(e.target.value);
    }

    return (
        <select id={props.id}
            className="form-control"
            value={props.value}
            onChange={onChange}>
            <option value="">Select Provider</option>
            {
                allProviders.map((provider) =>
                    <option key={provider.name} value={provider.name}>
                        {provider.displayName}
                    </option>)
            }
        </select>
    );
}
